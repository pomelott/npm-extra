
const fse = require('fs-extra');
const tbox = require('pomelo-toolbox');
const {logger} = require('../../lib/log')
const doInstall = require('./doInstall');
const {next} = tbox.step;
module.exports = (param) => {
    return next(async (resolve) => {
        let dep = fse.readJSONSync(param.objParam.json);
        if (!param.commonParam.length & !param.nameParam.length) {
            // install all
            let count = 0, installRes, installAllInfo = {};
            for (let key in dep.devDependencies) {
                installRes = await doInstall(key, dep.devDependencies[key], '-D', {writeJson: false})
                if (installRes.finish) {
                    count++;
                }
            }
            logger.log(`${count} devDependencies installed !`, 7);
            installAllInfo.devDependencies = count
            count = 0;
            for (let key in dep.dependencies) {
                installRes = await doInstall(key, dep.dependencies[key], '-S', {writeJson: false})
                if (installRes.finish) {
                    count++;
                }
            }
            logger.log(`${count} dependencies installed !`, 7);
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
                    logger.log(`installing ${moduleName} with error!`, 5)
                }
                
            }
            logger.log(`finish installing ${installTemp.join(' ')} !`, 7);
            resolve(installTemp)
        }
    })
    
}