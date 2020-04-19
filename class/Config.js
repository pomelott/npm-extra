const scptConfig = require('../scpt/config')
class Config {
    constructor (parent, param) {
        this.parent = parent;
        this.param = param;
    }

    exec () {
        scptConfig(this, this.param);
        return true;
    }
}
module.exports = Config;