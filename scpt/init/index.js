/*
 * @Author: Tate
 * @Date: 2020-03-26 17:30:45
 * @LastEditors: Tate
 * @LastEditTime: 2020-06-22 14:24:12
 * @Description: 
 */ 
const path = require('path');
const fse = require('fs-extra');
const {appendJson, getConf} = require('../../static')
const {filterDir} = require('../../lib/dir');
const {logger} = require('../../lib/log')
module.exports = (parent, param) => {
    const resPath = path.resolve(__dirname, '../../static/tpl.json');
    const targetPath = parent.opt.json;
    console.log(parent, param)
    
    // appendJson(resPath, {author: 'tate'});
    fse.copySync(resPath, targetPath);
    logger.log(`init finished at ${targetPath} !`, 7)
}