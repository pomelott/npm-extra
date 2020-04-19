// const {setConf} = require('pomelo-toolbox').config
// setConf({
//     logDefault: {
//         prefix: 'package-copy2121'
//     }
// })
const {classify} = require('pomelo-toolbox').cmd;
const {getConf} = require('../static');
module.exports.classifyPkgCmd = (argv) => {
    let output = classify(argv);
    if (!output.objParam.json) {
        output.objParam.json = getConf('json');
    }
    return output;
}
// module.exports.classify = (argv, cb) => {
//     let valuableParam = argv.slice(2), cmdParam = valuableParam[0], objParam = {}, commonParam = [], nameParam = [];
//     for (let i = 1; i < valuableParam.length; i++) {
//         if (valuableParam[i].match(/=/)) {
//             objParam[valuableParam[i].split('=')[0]] = valuableParam[i].split('=')[1];
            
//         } else if (valuableParam[i].match(/^-+\w+/)) {
//             commonParam.push(valuableParam[i])
//         } else {
//             nameParam.push(valuableParam[i])
//         }
//     }
//     cb({
//         all: argv,
//         valuableParam,
//         cmdParam,
//         objParam,
//         commonParam,
//         nameParam
//     })
// }