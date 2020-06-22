/*
 * @Author: Tate
 * @Date: 2020-03-29 16:25:21
 * @LastEditors: Tate
 * @LastEditTime: 2020-06-22 18:39:28
 * @Description: 
 */ 

const fse = require('fs-extra');
const {logger} = require('../../lib/log');
const {sleep, next} = require('pomelo-toolbox').step
const doUninstall = require('./doUninstall');
module.exports = (parent, param) => {
    return next(async (resolve) => {
        let dep = fse.readJSONSync(parent.opt.json);
        if (!param.commonParam.length & !param.nameParam.length) {
            let uninstallAllInfo = {}
            logger.warn(`this will uninstall all package in ${param.objParam.json}, and i want you to know what you are doing!`)
            // uninstall all
            logger.warn(`after 3s to uninstall all package!`)
            await sleep(3000)
            let count = 0, uninstallRes;
            for (let key in dep.devDependencies) {
                uninstallRes = await doUninstall(key, '-S')
                if (uninstallRes.finish) {
                    count++;
                }
            }
            logger.succeed(`${count} devDependencies uninstalled !`);
            uninstallAllInfo.devDependencies = count;
            count = 0;
            for (let key in dep.dependencies) {
                uninstallRes = await doUninstall(key, '-S');
                if (uninstallRes.finish) {
                    count++;
                }
            }
            logger.succeed(`${count} dependencies uninstalled !`);
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
                    logger.error(`uninstalling ${moduleName} with error!`)
                }
            }
            logger.succeed(`finish uninstalling ${uninstallTemp.join(' ')} !`);
            resolve(true)
        }
    })
    
}