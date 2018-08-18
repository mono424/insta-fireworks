const Ig4Remote = require('./classes/Ig4Remote');
var serverConfig = require('./config');
var { version } = require('./package.json');

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
  console.log('');
  console.log('[🎆🎆] Insta-Fireworks [🎆🎆]');
  console.log(`Version: ${version}`);
  console.log('');
  console.log(`Running on Port: ${serverConfig.port}`);
  console.log('');
});
