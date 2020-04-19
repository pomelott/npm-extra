const path = require('path');
const {getConf} = require('../static')
module.exports.filterDir = (dir) => {
    if (!path.isAbsolute(dir)) {
        return path.resolve(getConf('root'), dir)
    }
    return dir;
}