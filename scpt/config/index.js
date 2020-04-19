const path = require('path');
const {appendJson} = require('../../static');
const {logger} = require('../../lib/log')
module.exports = (self, param) => {
    if (param.objParam.json && !path.isAbsolute(param.objParam.json)) {
        param.objParam.json = path.resolve(process.cwd(), param.objParam.json)
    }
    self.parent.opt = Object.assign(self.parent.opt, param.objParam);
    appendJson(path.resolve(__dirname, '../../static/conf.json'), param.objParam);
    logger.log(`config success !`, 7)
    
    return self;
}