/*
 * @Author: Tate
 * @Date: 2020-06-22 15:30:37
 * @LastEditors: Tate
 * @LastEditTime: 2020-06-22 17:41:16
 * @Description: 
 */
(async function () {
    const Pkg = require('./index.js');
    const pkg = new Pkg();
    let res = await pkg.exec('pkg-copy install --save-dev chalk lodash@2.0.0');
    console.log(res)
})()