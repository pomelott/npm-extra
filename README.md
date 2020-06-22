# package-copy (package副本)

* You can use this package to regenerate the specified json file and perform general operations with the specified json file. The result will be in node_modules in the root directory.

* 你可以用此包重新生成指定的json文件，并以指定的json文件进行常规操作。结果会响应在根目录的node_modules中。

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