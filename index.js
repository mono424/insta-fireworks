const Ig4Remote = require('./classes/Ig4Remote');
var serverConfig = require('./config');
let remote = new Ig4Remote(serverConfig);

remote.start().then( () => {
  remote.ig4Start();
  console.log('[🎆🎆 ] Insta-Fireworks [🎆🎆 ]');
  console.log('');
  console.log(`Running on Port: ${serverConfig.port}`);
  console.log('');
});
