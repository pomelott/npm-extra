/*
 * @Author: Tate
 * @Date: 2020-07-23 16:58:17
 * @LastEditors: Tate
 * @LastEditTime: 2020-07-23 16:59:18
 * @Description: 
 */ 
const scptVersion = require('../scpt/version')
class Version {
    constructor (parent, param) {
        this.parent = parent;
        this.param = param;
    }

    exec () {
        scptVersion(this, this.param);
        return true;
    }
}
module.exports = Version;