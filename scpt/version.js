
const fse = require('fs-extra');
const {logger} = require('../lib/log');
const path = require('path')
module.exports = (selp, param) => {
    const targetPath = path.resolve(__dirname, "../package.json");
    // logger.info(`version：${fse.readJSONSync(targetPath).version}`);
    return `${fse.readJSONSync(targetPath).version}`
}