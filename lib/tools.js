/*
 * @Author: Tate
 * @Date: 2020-03-26 20:43:04
 * @LastEditors: Tate
 * @LastEditTime: 2020-07-28 12:10:18
 * @Description: 
 */ 
const fse = require('fs-extra');
const {getConf} = require('../static')
module.exports.checkDevPkg = (paramArr) => {
    for (let i = 0; i < paramArr.length; i++) {
        if (paramArr[i].match(/(-dev)|(-D)/g)) {
            return true;
        }
    }
    return false;
}
// 为不同的包管理工具提供统一的结果处理api
module.exports.getStdApi = function (sys, output) {
    let temp = {
        status: ''
    };
    switch (sys) {
        case 'npm':
            if (!output.err && output.stdout) {
                temp.version = output.stdout.match(/(?<=\+\s.+?\@)(\d+\.\d+\.\d+)/g)[0];
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
    }
    return temp;
}

module.exports.getJsonFile = function () {
    try {
        fse.readFileSync(getConf('json'));
        return true;
    } catch (e) {
        return false;
    }
}