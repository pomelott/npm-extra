# npm-extra-extension
* npm-extra-extension is used to generate additional dependency information files. It is very convenient to split business dependencies in front-end engineering.
* npm-extra-extension 用于生成额外的包依赖文件（默认为package-extra.json），能够与 package.json 区别管理，能够很方便的在工程化中对依赖做拆分。
* for detail : [https://github.com/pomelott/npm-extra](https://github.com/pomelott/npm-extra)
* Continue to increase and expand, please star ☆ and encourage： [https://github.com/pomelott/npm-extra](https://github.com/pomelott/npm-extra)

## Description
The package-extra.json file is generated in the root directory by default. You can also use it with private libraries such as verdaccio.

## Install npm-extra-extension

```
npm install -g npm-extra-extension
```

## Fast use

### Get help

```
npme
```
### Get subCommand

```
npme install --help
```

### View version

```
npme -V
npme --version
```

### init package-extra.json

```
npme init
```

### Install dependence

* Install all dependences accroding to package-extra.json.

```
    npme install
    npme i
```
* Install specific dependence

notice: this has the same param as npm

```
    npme install vue
    npme i vue
    npme install -D webpack
    npme install --save-dev webpack
```

### Uninstall dependence

* Uninstall all

 ```
     npme uninstall
     npme un
 ```

* Uninstall specific dependence
 
 ```
     npme uninstall vue
     npme un --no-save vue
 ```
### Config
* confg base cmd, has been set to yarn by default.

```
    npme config -b yarn
    npme config -b npm
```
* config dependence filename

```
    npme config -f package-extra.json
    npme config --file package-extra.json
```
