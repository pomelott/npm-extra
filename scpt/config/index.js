/*
 * @Author: Tate
 * @Date: 2020-03-28 21:00:49
 * @LastEditors: Tate
 * @LastEditTime: 2020-08-03 21:48:12
 * @Description: 
 */ 
const path = require('path');
const {appendJson} = require('../../static');
const {logger} = require('../../lib/log');
const { checkConfig } = require('../../static/confHandler');
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
            let key = mapConf[item],
                conf = {};
            conf[key] = param.args
            if (!checkConfig(conf)) {
                logger.error(`config ${key} failed, baseSys can't be ${param.args[index]}, for more info ,view https://github.com/pomelott/npm-extra !`) 
                process.exit(1);
            } else {
                confObj[key] = param.args[index];
            }
        })
        appendJson(path.resolve(__dirname, '../../static/conf.json'), confObj);
        for (let key in confObj) {
            logger.succeed(`config ${key} to ${confObj[key]} success !`)
        }
        return self;
    }
    
}