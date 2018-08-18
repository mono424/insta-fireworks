var path = require('path');
var base = require(path.join(__dirname, '..', 'ig4.config.js'));
var overwrite = require(path.join(__dirname, 'overwrites', 'config.json'));
module.exports = Object.assign(base, overwrite);