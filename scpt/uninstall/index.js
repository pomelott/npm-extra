/*
 * @Author: Tate
 * @Date: 2020-03-29 16:25:21
 * @LastEditors: Tate
 * @LastEditTime: 2020-07-29 18:18:03
 * @Description: 
 */ 

const fse = require('fs-extra');
const {logger} = require('../../lib/log');
const {sleep, next} = require('pomelo-toolbox').step
const doUninstall = require('./doUninstall');
const {jsonFile} = require('../../static')
module.exports = (parent, param) => {
    return next(async (resolve) => {
        let dep = fse.readJSONSync(jsonFile);
        if (!param.options.length & !param.args.length) {
            let uninstallAllInfo = {}
            logger.notice(`this will uninstall all package in ${jsonFile}, and i want you to know what you are doing!`)
            // uninstall all
            logger.notice(`after 3s to uninstall all package!`)
            await sleep(3000)
            let count = 0, uninstallRes;
            // 此处倒序遍历是为了先卸载非依赖项
            for (let key of Object.keys(dep.devDependencies).reverse()) {
                uninstallRes = await doUninstall(key)
                if (uninstallRes.finish) {
                    count++;
                }
            }
            logger.succeed(`${count} devDependencies uninstalled !`);
            uninstallAllInfo.devDependencies = count;
            count = 0;
            for (let key of Object.keys(dep.dependencies).reverse()) {
                uninstallRes = await doUninstall(key);
                if (uninstallRes.finish) {
                    count++;
                }
            }
            logger.finish(`${count} dependencies uninstalled !`);
            uninstallAllInfo.dependencies = count;
            resolve(uninstallAllInfo)
        } else {
            // uninstall single pkg
            let uninstallTemp = [], uninstallRes, moduleName;
            for (let i = 0; i < param.args.length; i++) {
                let item = param.args[i];
                moduleName = item.split('@')[0];
                uninstallRes = await doUninstall(moduleName, param.options.join(' '));
                if (uninstallRes.finish) {
                    uninstallTemp.push(`${moduleName}`);
                } else {
                    logger.error(`uninstalling ${moduleName} with error!`)
                }
            }
            logger.finish(`finish uninstalling ${uninstallTemp.join(' ')} !`);
            resolve(true)
        }
    })
    
}