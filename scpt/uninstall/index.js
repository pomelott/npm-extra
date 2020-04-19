
const fse = require('fs-extra');
const {logger} = require('../../lib/log');
const {sleep, next} = require('pomelo-toolbox').step
const doUninstall = require('./doUninstall');
module.exports = (param) => {
    return next(async (resolve) => {
        let dep = fse.readJSONSync(param.objParam.json);
        if (!param.commonParam.length & !param.nameParam.length) {
            let uninstallAllInfo = {}
            logger.log(`this will uninstall all package in ${param.objParam.json}, and i want you to know what you are doing!`, 4)
            // uninstall all
            logger.log(`after 3s to uninstall all package!`, 4)
            await sleep(3000)
            let count = 0, uninstallRes;
            for (let key in dep.devDependencies) {
                uninstallRes = await doUninstall(key, '-S')
                if (uninstallRes.finish) {
                    count++;
                }
            }
            logger.log(`${count} devDependencies uninstalled !`, 7);
            uninstallAllInfo.devDependencies = count;
            count = 0;
            for (let key in dep.dependencies) {
                uninstallRes = await doUninstall(key, '-S');
                if (uninstallRes.finish) {
                    count++;
                }
            }
            logger.log(`${count} dependencies uninstalled !`, 7);
            uninstallAllInfo.dependencies = count;
            resolve(uninstallAllInfo)
        } else {
            // uninstall single pkg
            let uninstallTemp = [], uninstallRes, moduleName;
            for (let i = 0; i < param.nameParam.length; i++) {
                let item = param.nameParam[i];
                moduleName = item.split('@')[0];
                uninstallRes = await doUninstall(moduleName, param.commonParam.join(' '));
                if (uninstallRes.finish) {
                    uninstallTemp.push(`${moduleName}`);
                } else {
                    logger.log(`uninstalling ${moduleName} with error!`, 5)
                }
            }
            logger.log(`finish uninstalling ${uninstallTemp.join(' ')} !`, 7);
            resolve(true)
        }
    })
    
}