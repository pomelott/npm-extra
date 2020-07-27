/*
 * @Author: Tate
 * @Date: 2020-06-22 15:30:37
 * @LastEditors: Tate
 * @LastEditTime: 2020-07-27 14:45:31
 * @Description: 测试脚本，可根据需要定制
 */
(async function () {
    const Pkg = require('./index.js');
    const pkg = new Pkg();
    let res = await pkg.exec('npme install --save-dev chalk lodash@2.0.0');
    console.log(res)
})()