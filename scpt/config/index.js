/*
 * @Author: Tate
 * @Date: 2020-03-28 21:00:49
 * @LastEditors: Tate
 * @LastEditTime: 2020-06-22 18:57:10
 * @Description: 
 */ 
const path = require('path');
const {appendJson} = require('../../static');
const {logger} = require('../../lib/log')
module.exports = (self, param) => {
    if (param.valuableParam.length === 1) {
        logger.error('no config params !!');
        return false;
    } else {
        if (param.objParam.json && !path.isAbsolute(param.objParam.json)) {
            param.objParam.json = path.resolve(process.cwd(), param.objParam.json)
        }
        self.parent.opt = Object.assign(self.parent.opt, param.objParam);
        appendJson(path.resolve(__dirname, '../../static/conf.json'), param.objParam);
        logger.succeed(`config success !`)
        return self;
    }
    
}