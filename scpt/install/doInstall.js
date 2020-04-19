const tbox = require('pomelo-toolbox');
const {next} = tbox.step;
const {exec} = tbox.cmd;
const {Loading, logger} = require('../../lib/log');
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
        if (!stdInstall.err && stdInstall.stdout) {
            let finalVersion;
            if (stdInstall.stderr) {
                load.warn(`installed package ${name}@${version} finished with warn!`);
                load.stop()
                logger.log(stdInstall.stderr, 4);
                logger.log(stdInstall.stdout, 3);
            } else {
                load.succeed(`installed package ${name}@${version} finished !`);
                logger.log(stdInstall.stdout, 3);
            }
            
            finalVersion = stdInstall.stdout.match(/(?<=@)(\d+\.\d+\.\d+)/g)[0];
            if (opt.writeJson && param.match(/(--save)|(-D)/g)) {
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
            load.fail(`installing package ${name}@${version} failed, please use pkg-copy install name@version to retry!`);
            stdInstall.stdout && logger.log(stdInstall.stdout, 5);
            stdInstall.stderr && logger.log(stdInstall.stderr, 5);
            stdInstall.syserr && logger.log(stdInstall.syserr, 5);
            resolve({
                finish: false,
                ...stdInstall
            });
        }
    })
}