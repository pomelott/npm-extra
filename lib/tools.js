/*
 * @Author: Tate
 * @Date: 2020-03-26 20:43:04
 * @LastEditors: Tate
 * @LastEditTime: 2020-08-03 22:02:59
 * @Description: 
 */ 
const fse = require('fs-extra');
const {getConf} = require('../static');
const path = require('path');
const {logger} = require('../lib/log');
module.exports.checkDevPkg = (paramArr) => {
    for (let i = 0; i < paramArr.length; i++) {
        if (paramArr[i].match(/(-dev)|(-D)/g)) {
            return true;
        }
    }
    return false;
}
module.exports.classifyCmd = (cmdObj) => {
    let param = {};
    let optionCmd = this.getOptionCmd(cmdObj.parent.args);
    param.cmd = cmdObj._name;
    param.options = optionCmd;
    param.args = cmdObj.args;
    param.raw = cmdObj.parent.rawArgs;
    return param;
}
module.exports.getOptionCmd = (cmdArr = []) => {
    let temp = [];
    cmdArr.forEach((item) => {
        if (/^-.*/.test(item)) {
            temp.push(item)
        }
    })
    return temp;
}
// 基础命令
module.exports.getStdCmd = function (sys = 'npm', obj = {}) {
    const {param, name, version = ''} = obj;
    switch(sys) {
        case 'npm':
            return {
                install: `npm install ${name}@${version} ${param}`,
                uninstall: `npm uninstall ${name}`,
            }
        case 'yarn':
            let subCmd = '';
            if (param.match(/(-D)|(--?dev)/)) {
                subCmd = ' --dev'
            }
            return {
                install: `yarn add ${name}@${version}${subCmd}`,
                uninstall: `yarn remove ${name}`,
            }
        default:
            logger.error('baseSys not found !!')
            return {};
    }
}
// 为不同的包管理工具提供统一的结果处理api
module.exports.getStdApi = function (sys, output) {
    let temp = {
        status: ''
    };
    switch (sys) {
        case 'npm':
            if (!output.err && output.stdout) {
                let matchArr = output.stdout.match(/(?<=\+\s.+?\@)(\d+\.\d+\.\d+)/g);
                if (matchArr) {
                    temp.version = matchArr[0];
                }
                if (output.stderr) {
                    temp.status = 'warn'
                } else {
                    temp.status = 'success'
                }
            } else {
                temp.status = 'err';
            }
            break;
        case 'cnpm':
            // 注意cnpm不存在锁版本机制
            if (!output.err ) {
                temp.status = 'success'
            } else {
                temp.status = 'err'
            }
            break;
        case 'yarn':
            let matchArr = output.stdout.match(/(?<=info\sDirect\sdependencies\n└─\s.+?@)(\d+\.\d+(?:\.\d+)?)/);
            if (matchArr) {
                temp.version = matchArr[0];
            }
            if (!output.err) {
                if (output.stdout && output.stderr) {
                    temp.status = 'warn'
                } else {
                    temp.status = 'success'
                }
            } else {
                temp.status = 'err'
            }
            
    }
    return temp;
}

module.exports.getJsonFile = function () {
    try {
        fse.readFileSync(path.resolve(process.cwd(), getConf('filename')));
        return true;
    } catch (e) {
        return false;
    }
}