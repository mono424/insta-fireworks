const fs = require('fs');
const Hapi = require('hapi');
const { spawn } = require('child_process');

module.exports = class Ig4Remote {

  constructor({ port = 3000, debug = false } = {}) {
    this.debug = debug;
    this.port = port;
    this.status = "stopped";
    this.log = [];
    this.ig4 = null;
    this.logLineLength = 400;
  }

  async start() {
    this.server = Hapi.server({
        port: this.port
    });

    await this.server.register(require('inert'));
    await this.server.register(require('nes'));

    this.server.subscription('/log', {
      onSubscribe: () => this.publishLog()
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

    this.server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
          directory: {
              path: 'app/build'
          }
        }
    });

    await this.server.start();
  }

  ig4Start() {
    this.ig4 = spawn('node', ['./node_modules/ig4', '-json', '-credentials=../../ig4.cred.js', '-config=../../ig4.config.js']);
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
    let entry = { data, type, date: new Date() };
    if(this.debug) { console.log(type, data); }
    this.log.push(entry);
    while (this.log.length > this.logLineLength) {
      this.log.shift();
    }
    this.publishLog(entry);
  }

  publishLog(line = null) {
    if(line){
      this.server.publish('/log', { type: "delta", payload: line });
    }else{
      this.server.publish('/log', { type: "complete", payload: this.log.reverse() });
    }
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

}
