const {initStatic} = require('./initStatic');
initStatic();


module.exports.setConf = require('./confHandler').setConf
module.exports.getConf = require('./confHandler').getConf
module.exports.appendJson = require('./confHandler').appendJson
module.exports.writeJson = require('./confHandler').writeJson
module.exports.appendPkg = require('./confHandler').appendPkg
module.exports.removePkg = require('./confHandler').removePkg

