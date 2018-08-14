const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const exists = util.promisify(fs.exists);

module.exports = class Ig4Config {

    constructor(configPath, credPath, configOverwritePath, credOverwritePath) {
        this.configOverwritePath = __dirname + "/" + configOverwritePath;
        this.credOverwritePath = __dirname + "/" + credOverwritePath;
        this.configPath = __dirname + "/" + configPath;
        this.credPath = __dirname + "/" + credPath;
        this.cache = {
            config: null,
            cred: null
        }
    }

    //async
    async init() {
        if (! await exists(this.credOverwritePath)) {
            await writeFile(this.credOverwritePath, '{}');
        }
        if (! await exists(this.configOverwritePath)) {
            await writeFile(this.configOverwritePath, '{}');
        }
        return this.updateCache();
    }

    // async
    async updateCache() {
        this.cache = {
            config: Object.assign(require(this.configPath), JSON.parse(await readFile(this.configOverwritePath))),
            cred: Object.assign(require(this.credPath), JSON.parse(await readFile(this.credOverwritePath))),
        };
    }

    getConfig() {
        return this.cache.config;
    }

    // async
    updateConfig(newConfig) {
        this.cache.config = newConfig;
        return this.saveConfig();
    }

    // async
    updateCred(user, pass) {
        this.cache.cred = {
            user,
            pass
        }
        return this.saveCred();
    }

    // async
    saveCred() {
        return writeFile(this.credPath, JSON.stringify(this.cache.cred));
    }

    // async
    saveConfig() {
        return writeFile(this.configPath, JSON.stringify(this.cache.config));
    }

}