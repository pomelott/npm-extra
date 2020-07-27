/*
 * @Author: Tate
 * @Date: 2020-06-22 17:42:59
 * @LastEditors: Tate
 * @LastEditTime: 2020-07-27 15:02:20
 * @Description: 
 */
const {getJsonFile} = require('../lib/tools')

class BaseClass {
    constructor () {
        if (!getJsonFile()) {
            throw new Error(`can't find package-extra.json, you should use <npme init> first !!`)
        }
    }
}

module.exports = BaseClass;