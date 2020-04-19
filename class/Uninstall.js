const scptUninstall = require('../scpt/uninstall')
class Uninstall {
    constructor (parent, param) {
        this.parent = parent;
        this.param = param;
    }

    exec () {
        return scptUninstall(this.param)
    }
}

module.exports = Uninstall;