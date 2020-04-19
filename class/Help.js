const scptHelp = require('../scpt/help')
class Help {
    constructor (parent, param) {
        this.parent = parent;
        this.param = param;
    }

    exec () {
        scptHelp(this, this.param);
        return true;
    }
}
module.exports = Help;