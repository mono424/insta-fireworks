const Ig4Remote = require('./classes/Ig4Remote');
var serverConfig = require('./config');

process.argv.forEach(val => {
  if (val === "--noui") {
    serverConfig.userinterface = false;
  }
if (val.match(/--port=.*/)) {
    serverConfig.port = val.substr(7);
  }
});

let remote = new Ig4Remote(serverConfig);

remote.start().then( () => {
  remote.ig4Start();
  console.log('');
  console.log('[🎆🎆] Insta-Fireworks [🎆🎆]');
  console.log('');
  console.log(`Running on Port: ${serverConfig.port}`);
  console.log('');
});
