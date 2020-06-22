/*
 * @Author: Tate
 * @Date: 2020-03-28 22:01:02
 * @LastEditors: Tate
 * @LastEditTime: 2020-06-22 17:44:10
 * @Description: 
 */ 
const BaseClass = require('./BaseClass');
const scptInstall = require('../scpt/install');
class Install extends BaseClass{
    constructor (parent, param) {
        super();
        this.parent = parent;
        this.param = param;
    }

    exec () {
        return scptInstall(this.parent, this.param)
    }
}

module.exports = Install;