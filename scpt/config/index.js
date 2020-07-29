/*
 * @Author: Tate
 * @Date: 2020-03-28 21:00:49
 * @LastEditors: Tate
 * @LastEditTime: 2020-07-29 17:39:34
 * @Description: 
 */ 
const path = require('path');
const {appendJson} = require('../../static');
const {logger} = require('../../lib/log');
const mapConf = {
    '-b': 'baseSys',
    '--base-sys': 'baseSys',
    '-f': 'filename',
    '--filename': 'filename'
}
module.exports = (self, param) => {
    if (!param.options.length && !param.args.length) {
        logger.error('no config params !!');
        return false;
    } else {
        let confObj = {};
        param.options.forEach((item, index) => {
            let key = mapConf[item];
            confObj[key] = param.args[index];
        })
        appendJson(path.resolve(__dirname, '../../static/conf.json'), confObj);
        logger.succeed(`config success !`)
        return self;
    }
    
}