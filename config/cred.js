var path = require('path');
var base = require(path.join(__dirname, '..', 'ig4.cred.js'));
var overwrite = require(path.join(__dirname, 'overwrites', 'cred.json'));
module.exports = Object.assign(base, overwrite);