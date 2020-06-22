/*
 * @Author: Tate
 * @Date: 2020-06-22 17:42:59
 * @LastEditors: Tate
 * @LastEditTime: 2020-06-22 17:58:20
 * @Description: 
 */
const {getJsonFile} = require('../lib/tools')

class BaseClass {
    constructor () {
        if (!getJsonFile()) {
            throw new Error('you should use pkg-copy init first !!')
        }
    }
}

module.exports = BaseClass;