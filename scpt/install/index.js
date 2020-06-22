/*
 * @Author: Tate
 * @Date: 2020-03-26 18:49:49
 * @LastEditors: Tate
 * @LastEditTime: 2020-06-22 18:41:58
 * @Description: 
 */ 

const fse = require('fs-extra');
const tbox = require('pomelo-toolbox');
const {logger} = require('../../lib/log')
const doInstall = require('./doInstall');
const {next} = tbox.step;
module.exports = (parent, param) => {
    return next(async (resolve) => {
        let dep = fse.readJSONSync(parent.opt.json);
        if (!param.commonParam.length & !param.nameParam.length) {
            // install all
            let count = 0, installRes, installAllInfo = {};
            for (let key in dep.devDependencies) {
                installRes = await doInstall(key, dep.devDependencies[key], '-D', {writeJson: false})
                if (installRes.finish) {
                    count++;
                }
            }
            logger.succeed(`${count} devDependencies installed !`);
            installAllInfo.devDependencies = count
            count = 0;
            for (let key in dep.dependencies) {
                installRes = await doInstall(key, dep.dependencies[key], '-S', {writeJson: false})
                if (installRes.finish) {
                    count++;
                }
            }
            logger.succeed(`${count} dependencies installed !`);
            installAllInfo.dependencies = count;
            resolve(installAllInfo)
        } else {
            // install single pkg
            let installTemp = [], installRes, moduleName, moduleVersion, finalVersion;
            for (let i = 0; i < param.nameParam.length; i++) {
                let item = param.nameParam[i];
                moduleName = item.split('@')[0];
                moduleVersion = item.split('@')[1];
                installRes = await doInstall(moduleName, moduleVersion, param.commonParam.join(' '));
                finalVersion = installRes.finalVersion;
                if (installRes.finish) {
                    installTemp.push(`${moduleName}@${finalVersion}`);
                } else {
                    logger.error(`installing ${moduleName} with error!`)
                }
                
            }
            logger.succeed(`finish installing ${installTemp.join(' ')} !`);
            resolve(installTemp)
        }
    })
    
}