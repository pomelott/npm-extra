const {classify} = require('pomelo-toolbox').cmd;
const {getConf} = require('../static');
module.exports.classifyPkgCmd = (argv) => {
    let output = classify(argv);
    if (!output.objParam.json) {
        output.objParam.json = getConf('json');
    }
    return output;
}