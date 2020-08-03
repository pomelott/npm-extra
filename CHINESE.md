# npm-extra-extension
* 用于生成额外的包依赖文件，能够与 package.json 区别管理，能够很方便的在工程化中对依赖做拆分。
* 持续的维护与扩展中，更多有用的 C++ 扩展请持续关注，欢迎标星鼓励，支持国内开发，中国 🇨🇳雄起。
* 都是中国人，来都来了，就赐我一个小星星吧 ☆ ：[https://github.com/pomelott/npm-extra](https://github.com/pomelott/npm-extra)
* 催更功能请issue、建议请issue。

## 介绍
* 默认会在根目录生成package-extra.json, 自定义npm私库 verdaccio 使用，会非常方便 ！
* 当需要区别管理 工程化脚手架的开发环境依赖 与 业务依赖时，会非常方便 ！

## 安装 npm-extra-extension

```
npm install -g npm-extra-extension
```

## 快速使用

### 获取帮助

```
npme
```
### 获取子命令帮助

```
npme install --help
```

### 查看版本

```
npme -V
npme --version
```

### 初始化依赖文件（默认为package-extra.json）

```
npme init
```

### 安装依赖

* 根据 package-extra.json 安装依赖

```
    npme install
    npme i
```
* 安装指定依赖

注: 命令使用方法同npm类似

```
    npme install vue
    npme i vue
    npme install -D webpack
    npme install --save-dev webpack
```

### 卸载依赖

* 卸载全部依赖

 ```
     npme uninstall
     npme un
 ```

* 卸载指定依赖
 
 ```
     npme uninstall vue
     npme un --no-save vue
 ```
### 配置
* 配置基础命令，默认为yarn(当前支持npm与yarn)

```
    npme config -b yarn
    npme config -b npm
```
* 配置依赖文件名称

```
    npme config -f package-extra.json
    npme config --file package-extra.json
```
* 根据当前的执行路径解析带有相对路径的json文件名，并初始化文件。
```
    npme config -f ./src/package-extra.json
```
