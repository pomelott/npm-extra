/*
 * @Author: Tate
 * @Date: 2020-06-22 15:30:37
 * @LastEditors: Tate
 * @LastEditTime: 2020-07-29 20:41:14
 * @Description: 测试脚本，可根据需要定制
 */

(async function () {
    const {exec} = require('child_process')
    const cwd = '/Users/tate/ek_fe/git/student/';
    // 命令执行
    exec('npme config baseSys=yarn', () => {
        exec('npme install --save-dev chalk lodash@2.0.0', {cwd}, (error, stdout, stderr) => {
            console.log('---------- error ----------')
            console.log(error)
            console.log('---------- stdout ----------')
            console.log(stdout)
            console.log('---------- stderr ----------')
            console.log(stderr)
        })
    })
})()