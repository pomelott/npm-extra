const scptInstall = require('../scpt/install')
class Install {
    constructor (parent, param) {
        this.parent = parent;
        this.param = param;
    }

    exec () {
        return scptInstall(this.param)
    }
}

module.exports = Install;