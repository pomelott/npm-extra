const scptInit = require('../scpt/init');
const fse = require('fs-extra');
const {logger} = require('../lib/log');
const {jsonFile} = require('../static')
class Init {
    constructor (parent, param) {
        this.parent = parent;
        this.param = param;
    }

    baseCheck () {
        if (fse.existsSync(jsonFile)) {
            logger.warn('json file is already exist !!!');
            return false;
        } else {
            return true;
        }
    }

    exec () {
        if (this.baseCheck()) {
            scptInit(this.parent, this.param);
            return true;
        }
        return false;
    }


}
module.exports = Init;