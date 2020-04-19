const tbox = require('pomelo-toolbox');
const {next} = tbox.step;
const {exec} = tbox.cmd;
const {Loading, logger} = require('../../lib/log');
const {getConf, removePkg} = require('../../static');

const uninstallDefault = {
    writeJson: true // 是否写入json文件
}

module.exports = (name, param = '', opt) => {
    opt = Object.assign(uninstallDefault, opt);
    let load = new Loading(`uninstalling package ${name}...`)
    return next(async (resolve) => {
        let stdUninstall = await exec(`${getConf('baseSys')} uninstall ${param} ${name}`);
        if (!stdUninstall.err && stdUninstall.stdout) {
            if (stdUninstall.stderr) {
                load.warn(`uninstalled package ${name} finished with warn!`);
                load.stop()
                logger.log(stdUninstall.stderr, 4);
                logger.log(stdUninstall.stdout, 3);
            } else {
                load.succeed(`uninstalled package ${name} finished !`);
                logger.log(stdUninstall.stdout, 3);
            }
            if (opt.writeJson && param.match(/(--save)|(-S)/g)) {
                let temp = {};
                temp[name] = name;
                removePkg(getConf('json'), temp)
                
            }
            resolve({
                finish: true,
                ...stdUninstall
            })
        } else {
            load.fail(`uninstalling package ${name} failed, please use pkg-copy uninstall "name" to retry!`);
            stdUninstall.stdout && logger.log(stdUninstall.stdout, 5);
            stdUninstall.stderr && logger.log(stdUninstall.stderr, 5);
            stdUninstall.syserr && logger.log(stdUninstall.syserr, 5);
            resolve({
                finish: false,
                ...stdUninstall
            });
        }
    })
}