var Updater = require('github-update');

module.exports = class Ig4Update {

    constructor() {
        this.updater = Updater({
            repo: "mono424/insta-fireworks",
            localPath: "./",
        });
    }

    check() {
        let { updater } = this;
        return new Promise((resolve, reject) => updater.check((error, upToDate) => { error ? reject(error) : resolve(!upToDate); }));
    }

    update(killAfter = false) {
        return new Promise( (resolve, reject) => {
            let { updater } = this;
            updater.check((error, upToDate) => {
                if (error) {
                    return reject(error);
                }
                if (!upToDate) {
                    updater.update((success, error) => {
                        if (error) {
                            return reject(error);
                        }
                        if (!success) {
                            return reject("Unknown error.");
                        }
                        resolve();
                    });
                }
                reject("Already up to date.");
            })
        })
        .then(this.updateNPM)
        .then(() => {
            if (killAfter) {
                process.kill();
            }
        });
    }

    updateNPM() {
        return new Promise( (resolve) => {
            var child_process = require('child_process');
            child_process.execSync("npm install", { stdio: [0, 1, 2] });
            child_process.on('exit', function () {
                resolve();
            });
        });
    }

}