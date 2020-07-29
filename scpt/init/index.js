/*
 * @Author: Tate
 * @Date: 2020-03-26 17:30:45
 * @LastEditors: Tate
 * @LastEditTime: 2020-07-28 16:53:29
 * @Description: 
 */ 
const path = require('path');
const fse = require('fs-extra');
const {logger} = require('../../lib/log');
const {jsonFile} = require('../../static')
module.exports = (parent, param) => {
    const resPath = path.resolve(__dirname, '../../static/tpl.json');
    fse.copySync(resPath, jsonFile);
    logger.succeed(`init finished at ${jsonFile} !`)
}