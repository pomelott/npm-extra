/*
 * @Author: Tate
 * @Date: 2020-03-27 14:19:37
 * @LastEditors: Tate
 * @LastEditTime: 2020-07-28 16:44:53
 * @Description: 
 */ 
const path = require('path');
module.exports.setConf = require('./confHandler').setConf
module.exports.getConf = require('./confHandler').getConf
module.exports.appendJson = require('./confHandler').appendJson
module.exports.writeJson = require('./confHandler').writeJson
module.exports.appendPkg = require('./confHandler').appendPkg
module.exports.removePkg = require('./confHandler').removePkg
module.exports.jsonFile = path.resolve(process.cwd(), this.getConf('filename'));
