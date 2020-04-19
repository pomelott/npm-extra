const fse = require('fs-extra');
const fs = require('fs');
const path = require('path');
const jsonDir = path.resolve(__dirname, './conf.json')
const {appendJson, writeJson} = require('pomelo-toolbox').json

module.exports.getConf = (key) => {
    if (!key) {
        return fse.readJSONSync(jsonDir)
    }
    return fse.readJSONSync(jsonDir)[key]
}

module.exports.setConf = (obj) => {
    let json = fse.readJSONSync(jsonDir);
    for (let key in obj) {
        json[key] = obj[key]
    }
    fs.writeFileSync(jsonDir, JSON.stringify(json, null, '\t'), {encoding: 'utf-8'})
}

module.exports.appendJson = appendJson;

module.exports.writeJson = writeJson;

module.exports.appendPkg = (type, targetJson, obj) => {
    let cnt = fse.readJSONSync(targetJson),
        key = type === 'devDep' ? 'devDependencies' : 'dependencies';
    cnt[key] = Object.assign(cnt[key], obj);
    this.writeJson(targetJson, cnt)
}

module.exports.removePkg = (targetJson, obj) => {
    let cnt = fse.readJSONSync(targetJson);
    for (let key in obj) {
        if (cnt.devDependencies[key]) {
            delete cnt.devDependencies[key];
        }
        if (cnt.dependencies[key]) {
            delete cnt.dependencies[key]
        }
    }
    this.writeJson(targetJson, cnt)
}
