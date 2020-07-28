/*
 * @Author: Tate
 * @Date: 2020-03-27 13:48:58
 * @LastEditors: Tate
 * @LastEditTime: 2020-07-28 12:09:27
 * @Description: 
 */ 
const tbox = require('pomelo-toolbox');
const {next} = tbox.step;
const {exec} = tbox.cmd;
const {Loading, logger} = require('../../lib/log');
const {getStdApi} = require('../../lib/tools');
const {getConf, appendPkg} = require('../../static');

const installDefault = {
    writeJson: true // 是否写入json文件
}

module.exports = (name, version, param = '', opt) => {
    if (!version) {
        version = 'latest';
    }
    opt = Object.assign(installDefault, opt);
    let load = new Loading(`installing package ${name}@${version}...`)
    return next(async (resolve) => {
        let stdInstall = await exec(`${getConf('baseSys')} install ${param} ${name}@${version}`);
        let stdApi = getStdApi(getConf('baseSys'), stdInstall), finalVersion;
        finalVersion = stdApi.version || version;
        if (stdApi.status !== 'err') {
            if (stdApi.status === 'warn') {
                load.warn(`installed package ${name}@${version} finished with warn!`);
                load.stop()
                logger.warn(stdInstall.stderr);
                logger.finish(stdInstall.stdout);
            } else {
                load.succeed(`installed package ${name}@${version} finished !`);
                logger.finish(stdInstall.stdout);
            }
            if (opt.writeJson && param.match(/(--save)|(-D)|(-S)/g)) {
                let temp = {};
                temp[name] = finalVersion;
                if (param.match(/(-dev)|(-D)/g)) {
                    
                    appendPkg('devDep', getConf('json'), temp)
                } else {
                    appendPkg('dep', getConf('json'), temp)
                }
            }
            resolve({
                finalVersion,
                finish: true,
                ...stdInstall
            })
        } else {
            load.fail(`installing package ${name}@${version} failed, please use npme install name@version to retry!`);
            stdInstall.stdout && logger.error(stdInstall.stdout);
            stdInstall.stderr && logger.error(stdInstall.stderr);
            stdInstall.syserr && logger.error(stdInstall.syserr);
            resolve({
                finish: false,
                ...stdInstall
            });
        }
    })
}