const scptConfig = require('../scpt/config');
const scptShowConf = require('../scpt/config/showConf');
class Config {
    constructor (parent, param) {
        this.parent = parent;
        this.param = param;
    }

    exec () {
        if (
            this.param.options.indexOf('-l') !== -1 ||
            this.param.options.indexOf('--list') !== -1
        ) {
            this.showList();
        } else {
            this.doConfig();
        }
        return true;
    }
    showList () {
        scptShowConf(this, this.param);
    }
    doConfig () {
        scptConfig(this, this.param);
    }
}
module.exports = Config;