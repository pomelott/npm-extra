/*
 * @Author: Tate
 * @Date: 2020-03-29 17:50:23
 * @LastEditors: Tate
 * @LastEditTime: 2020-06-22 18:46:03
 * @Description: 
 */ 

const {logger} = require('../lib/log');

class Init {
    constructor (parent, param) {
        this.parent = parent;
        this.param = param;
    }



    exec () {
        if (this.parent[this.param.cmdParam]) {
            return this.parent[this.param.cmdParam](this.param)
        } else {
            logger.error(`this.param.cmdParam doesn't exist !`);
            return false;
        }
        
    }


}
module.exports = Init;