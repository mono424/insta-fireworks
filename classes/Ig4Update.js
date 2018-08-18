var Updater = require('github-update');
var Boom = require('boom');

module.exports = class Ig4Update {

    constructor() {
        this.updater = Updater({
            repo: "mono424/insta-fireworks",
            localPath: "./",
        });
    }

    check() {
        let { updater } = this;
        return new Promise((resolve, reject) => updater.check((error, upToDate) => { error ? reject(Boom.internal(error)) : resolve(!upToDate); }));
    }

    update(killAfter = false) {
        return new Promise( (resolve, reject) => {
            let { updater } = this;
            updater.check((error, upToDate) => {
                if (error) {
                    return reject(Boom.internal(error));
                }
                if (upToDate) {
                    reject(Boom.preconditionFailed("Already up to date!"));
                }
                updater.update((success, error) => {
                    console.log(success ? "✔ Update successful" : "❌ Update failed");
                    if (error) {
                        return reject(Boom.internal(error));
                    }
                    if (!success) {
                        return reject(Boom.internal("Unknown error."));
                    }
                    resolve();
                });
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
            var child = child_process.spawn("npm", ['install']);
            child.stdout.on('data', (data) => console.log(`npm: ${data}`));
            child.on('exit', resolve);
        });
    }

}