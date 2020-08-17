/*
 * @Author: Tate
 * @Date: 2020-06-22 15:30:37
 * @LastEditors: Tate
 * @LastEditTime: 2020-08-03 22:01:58
 * @Description: 测试脚本，可根据需要定制
 */

(async function () {
    const {exec} = require('child_process')
    const cwd = '/Users/tate/Documents/work/pomeloGithub/npm-extra';
    // 命令执行
    // exec('npme init', (error, stdout, stderr) => {
        exec('npme config --list', {cwd}, (error, stdout, stderr) => {
            console.log('---------- error ----------')
            console.log(error)
            console.log('---------- stdout ----------')
            console.log(stdout)
            console.log('---------- stderr ----------')
            console.log(stderr)
        })
    // })
})()