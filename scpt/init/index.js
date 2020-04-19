const path = require('path');
const fse = require('fs-extra');
const {appendJson, getConf} = require('../../static')
const {filterDir} = require('../../lib/dir');
const {logger} = require('../../lib/log')
module.exports = (param) => {
    const resPath = path.resolve(__dirname, '../../static/tpl.json');
    let targetPath;
    if (!param.objParam.json) {
        targetPath = getConf('json')
    } else {
        targetPath = filterDir(param.objParam.json);
    }
    // appendJson(resPath, {author: 'tate'});
    fse.copySync(resPath, targetPath);
    logger.log(`init finished at ${targetPath} !`, 7)
}