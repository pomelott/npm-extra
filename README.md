# npm-extra-extension

* [🇨🇳中文文档](https://github.com/pomelott/npm-extra/blob/master/CHINESE.md)
* npm-extra-extension is used to generate additional dependency information files. It is very convenient to split business dependencies in front-end engineering.
* Continue to increase and expand, please give star ☆ and encourage.

## Description

* The package-extra.json file is generated in the root directory by default. You can also use it with private libraries such as verdaccio.
* It is very convenient when it is necessary to distinguish between the development environment dependency and business dependency of engineering scaffolding.

## Install npm-extra-extension

```bash
npm install -g npm-extra-extension
```

## Fast use

### Get help

```bash
npme
```

### Get subCommand

```bash
npme install --help
```

### View version

```bash
npme -V
npme --version
```

### init package-extra.json

```bash
npme init
```

### Install dependence

* Install all dependences accroding to package-extra.json.

```bash
    npme install
    npme i
```

* Install specific dependence

notice: this has the same param as npm

```bash
    npme install vue
    npme i vue
    npme install -D webpack
    npme install --save-dev webpack
```

### Uninstall dependence

* Uninstall all

```bash
    npme uninstall
    npme un
```

* Uninstall specific dependence

 ```bash
     npme uninstall vue
     npme un --no-save vue
 ```

### Config

* view configuration

```bash
    npme config --list
    npme config --list filename
    npme config -l baseSys
```

* config base cmd, has been set to yarn by default(now supports npm and yarn).

```bash
    npme config -b yarn
    npme config -b npm
```

* config dependence filename

```bash
    npme config -f package-extra.json
    npme config --file package-extra.json
```

* init json file according to a relative path resolved with the execicute path.

```bash
    npme config -f ./src/package-extra.json
```
