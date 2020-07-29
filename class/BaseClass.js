/*
 * @Author: Tate
 * @Date: 2020-06-22 17:42:59
 * @LastEditors: Tate
 * @LastEditTime: 2020-07-29 20:25:25
 * @Description: 
 */
const {getConf, jsonFile} = require('../static');
const {getJsonFile} = require('../lib/tools')
class BaseClass {
    constructor () {
        if (!getJsonFile()) {
            throw new Error(`can't find ${jsonFile}, you should use <npme init> first !!`)
        }
    }
}

module.exports = BaseClass;