/*
 * @Author: Tate
 * @Date: 2020-03-29 16:23:09
 * @LastEditors: Tate
 * @LastEditTime: 2020-06-22 18:01:16
 * @Description: 
 */ 

const BaseClass = require('./BaseClass');
const scptUninstall = require('../scpt/uninstall')
class Uninstall extends BaseClass{
    constructor (parent, param) {
        super();
        this.parent = parent;
        this.param = param;
    }

    exec () {
        return scptUninstall(this.parent, this.param)
    }
}

module.exports = Uninstall;