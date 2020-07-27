# npm-extra
npm-extra is used to generate additional dependency information files. It is very convenient to split business dependencies in front-end engineering.


## Description
The `package-extra.json` file is generated in the root directory by default. You can also use it with private libraries such as verdaccio.

## Install Npm-extra-extension


```
npm install -g npm-extra-extension
```

## Fast Use

* Get Help

```
npme
```

* View version

```
npme -v
```

* Init package-extra.json

```
npme init
```

* Install
    1. install all dependences according to package-extra.json.

    ```
        npme install
        npme i
    ```
    1. install specific dependence
    notice: this has the same usage as npm

    ```
        npme install -S vue
        npme install --save vue
        npme i -S vue
        npme install -D webpack
        npme install --save-dev webpack
    ```

* Uninstall
    1. uninstall all dependences

    ```
        npme uninstall
        npme un
    ```
    2. uninstall specific dependence
    
    ```
        npme uninstall --save vue
        npme un --save vue
    ```
