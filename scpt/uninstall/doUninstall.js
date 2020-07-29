/*
 * @Author: Tate
 * @Date: 2020-03-29 16:25:53
 * @LastEditors: Tate
 * @LastEditTime: 2020-07-29 20:40:01
 * @Description: 
 */ 
const tbox = require('pomelo-toolbox');
const {next} = tbox.step;
const {exec} = tbox.cmd;
const {Loading, logger} = require('../../lib/log');
const {getConf, removePkg, jsonFile} = require('../../static');
const {getStdApi, getStdCmd} = require('../../lib/tools');
const uninstallDefault = {
    writeJson: true // 是否写入json文件
}

module.exports = (name, param = '', opt) => {
    opt = Object.assign(uninstallDefault, opt);
    let load = new Loading(`uninstalling package ${name}...`)
    return next(async (resolve) => {
        let sys = getConf('baseSys'),
            stdUninstallCmd = getStdCmd(sys, {param, name}).uninstall;
        let stdUninstall = await exec(stdUninstallCmd);
        let stdUninstallApi = getStdApi(sys, stdUninstall);
        if (stdUninstallApi.status !== 'err') {
            if (stdUninstallApi.status === 'warn') {
                load.warn(`uninstalled package ${name} finished with warn!`);
                load.stop();
                logger.warn(stdUninstall.stderr);
                logger.finish(stdUninstall.stdout);
            } else {
                load.succeed(`uninstalled package ${name} finished !`);
                logger.finish(stdUninstall.stdout);
            }
            if (opt.writeJson && !param.match(/(--no-save)/g)) {
                let temp = {};
                temp[name] = name;
                removePkg(jsonFile, temp)
            }
            resolve({
                finish: true,
                ...stdUninstall
            })
        } else {
            load.fail(`uninstalling package ${name} failed, please use <npme uninstall> [name] to retry!`);
            stdUninstall.stdout && logger.error(stdUninstall.stdout);
            stdUninstall.stderr && logger.error(stdUninstall.stderr);
            stdUninstall.syserr && logger.error(stdUninstall.syserr);
            resolve({
                finish: false,
                ...stdUninstall
            });
        }
    })
}