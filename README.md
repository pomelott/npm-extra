# package-copy (package副本)

<img width="200" height="200" src="https://webpack.js.org/assets/icon-square-big.svg">

## 致力于解放FE的劳动力，让我们搬更少的砖！

* 喜欢请给星，我会更有动力持续维护！https://github.com/pomelott/package-copy
* 兼容npm，cnpm(yarn会在后续支持)
* 你可以用此包重新生成指定的json文件，并以指定的json文件进行常规操作。结果会响应在根目录的node_modules中。并同时响应在package-copy.json(默认)和package.json文件中。
* 此工具遵循npm、cnpm的原有特性，如cnpm不存在锁机制，因此当使用cnpm install是，若不指定版本号，则获取到的version为latest.
* 此工具常用于在前端工程化定制脚手架中，需要将脚手架环境依赖与项目的业务依赖区别管理时使用。


## Install

`npm install --save-dev package-copy`

## Usage

### use with Command Line

`./node_modules/.bin/pkg-copy config json=./package-test.json`

`./node_modules/.bin/pkg-copy init`

`./node_modules/.bin/pkg-copy init json=./package-test.json`

`./node_modules/.bin/pkg-copy install`

`./node_modules/.bin/pkg-copy install -D vue-loader`

`./node_modules/.bin/pkg-copy uninstall --save vue@2.5.0 react`


### use with js

```js
const PkgCopy = require('package-copy');

// 如果不初始化配置项，则默认在执行目录下生成package-copy.json

let pkg = new PkgCopy({
    json: './package-test.json'
})

pkg.exec('pkg-copy init')
pkg.exec('pkg-copy uninstall').then()
pkg.exec('pkg-copy install vue -S').then((msg) => {})  // use promise
await pkg.exec('pkg-copy install vue -S')   // use async/await
```