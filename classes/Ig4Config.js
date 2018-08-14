const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

module.exports = class Ig4Config {

    async constructor(configPath, credPath) {
        this.configPath = configPath;
        this.credPath = credPath;
        this.cache = {
            config: null,
            cred: null
        }
    }

    //async
    init() {
        return this.updateCache();
    }

    // async
    async updateCache() {
        this.cache = {
            config: JSON.parse(await readFile(this.configPath)),
            cred: JSON.parse(await readFile(this.credPath))
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