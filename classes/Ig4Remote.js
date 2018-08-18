const fs = require('fs');
const Hapi = require('hapi');
const Joi = require('joi');
const { spawn } = require('child_process');
const Ig4Config = require('./Ig4Config');
const Ig4Update = require('./Ig4Update');

module.exports = class Ig4Remote {

  constructor({ port = 3000, debug = false, userinterface = true, configPath = "../config/config.js", credPath = "../config/cred.js", configOverwritePath = "../config/overwrites/config.json", credOverwritePath = "../config/overwrites/cred.json" } = {}) {
    this.configOverwritePath = configOverwritePath;
    this.credOverwritePath = credOverwritePath;
    this.configPath = configPath;
    this.credPath = credPath;
    this.debug = debug;
    this.port = port;
    this.userinterface = userinterface;
    this.status = "stopped";
    this.log = [];
    this.ig4 = null;
    this.logLineLength = 400;
    this.config = null;
  }

  async start() {
    let { credPath, configPath, configOverwritePath, credOverwritePath } = this;
    this.config = new Ig4Config(configPath, credPath, configOverwritePath, credOverwritePath);
    this.updater = new Ig4Update();
    await this.config.init();

    this.server = Hapi.server({
        port: this.port,
        routes: {
          cors: { origin: ['*'] }
        }
    });

    await this.server.register(require('inert'));
    await this.server.register(require('nes'));

    this.server.subscription('/log', {
      onSubscribe: socket => this.publishLog(null, socket)
    });

    this.server.subscription('/settings', {
      onSubscribe: socket => this.publishSettings(socket)
    });

    this.server.route({
      method: 'GET',
      path: '/api/config',
      handler: (...args) => this.route_config_get(...args)
    });

    this.server.route({
      method: 'GET',
      path: '/api/update',
      handler: () => this.updater.check()
    });

    this.server.route({
      method: 'POST',
      path: '/api/update',
      handler: () => this.updater.update(true)
    });

    this.server.route({
      method: 'POST',
      path: '/api/config',
      handler: (...args) => this.route_config_post(...args),
      // validate: {
      //   payload: {
      //     config: Joi.object().required()
      //   }
      // }
    });

    this.server.route({
        method: 'GET',
        path: '/api/log',
        handler: (...args) => this.route_log(...args)
    });

    this.server.route({
        method: 'GET',
        path: '/api/stop',
        handler: (...args) => this.route_stop(...args)
    });

    this.server.route({
        method: 'GET',
        path: '/api/start',
        handler: (...args) => this.route_start(...args)
    });

    this.server.route({
        method: 'GET',
        path: '/api/clear-cookie',
        handler: (...args) => this.route_clearCookie(...args)
    });

    if (this.userinterface) {
      this.server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
          directory: {
            path: 'app/build'
          }
        }
      });
    }
      
    await this.server.start();
  }

  ig4Start() {
    let { credPath, configPath } = this;
    this.ig4 = spawn('node', ['./node_modules/ig4', '-json', `-credentials=../${credPath}`, `-config=../${configPath}`]);
    this.ig4.stdout.on('data', (...args) => this.handleIg4Data(...args));
    this.ig4.stderr.on('data', (...args) => this.handleIg4Error(...args));
    this.ig4.on('close', (...args) => this.handleIg4Close(...args));
    this.status = "started";
  }

  ig4Stop() {
    if (this.ig4) this.ig4.kill('SIGHUP');
  }

  handleIg4Data(data) {
    this.addToIg4Log(data.toString(), "data");
  }

  handleIg4Error(error) {
    this.addToIg4Log(error.toString(), "error");
  }

  handleIg4Close(code) {
    this.addToIg4Log(`ended with code: ${code}`);
    this.status = "stopped";
  }

  addToIg4Log(data, type = "data") {
    if(!data) return;
    try {
      data = JSON.parse(data);
    } catch (e) {
      // data is not json
    }
    let entry = { data, type, date: new Date() };
    if(this.debug) { console.log(type, data); }
    this.log.push(entry);
    while (this.log.length > this.logLineLength) {
      this.log.shift();
    }
    this.publishLog(entry);
  }

  publishLog(line = null, socket = null) {
    socket = socket ? socket : this.server;
    if(line){
      socket.publish('/log', { type: "delta", payload: [line] });
    }else{
      socket.publish('/log', { type: "complete", payload: this.log.reverse() });
    }
  }

  publishSettings(socket = null) {
    socket = socket ? socket : this.server;
    socket.publish('/settings', { type: "complete", payload: this.config.getConfig() });
  }

  route_index(request, h) {
    return this.status;
  }

  route_log(request, h) {
    return this.log.reverse()
  }

  route_start(request, h) {
    this.ig4Start();
    return "ok";
  }

  route_stop(request, h) {
    this.ig4Stop();
    return "ok";
  }

  route_clearCookie(request, h) {
    fs.unlinkSync('./data/cookies/user.json');
    return "ok";
  }

  route_config_get(request, h) {
    return JSON.stringify(this.config.getConfig());    
  }

  async route_config_post(request, h) {
    let { config } = request.payload;
    await this.config.updateConfig(config);
    this.publishSettings();
    return "ok";
  }

}
