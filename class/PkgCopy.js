/*
 * @Author: Tate
 * @Date: 2020-03-28 21:15:20
 * @LastEditors: Tate
 * @LastEditTime: 2020-07-29 18:15:05
 * @Description: 
 */ 
const {getConf, setConf} = require('../static');
const Config = require('./Config');
const Install = require('./Install');
const Init = require('./Init');
const Uninstall = require('./Uninstall');
class PkgCopy {
    constructor (opt = {}) {
        this.opt = Object.assign({}, getConf(), opt);
        if (Object.keys(opt).length) {
            this.config({
                cmdParam: 'config',
                objParam: opt
            })
        }
        this.configCmd = null;
        this.initCmd = null;
        this.installCmd = null;
        this.uninstallCmd = null;
    }

    
   

    config (param) {
        this.configCmd = new Config(this, param);
        return this.configCmd.exec()
    }

    init (param) {
        this.initCmd = new Init(this, param);
        return this.initCmd.exec();
    }

    install (param) {
        this.installCmd = new Install(this, param);
        return this.installCmd.exec();
    }


    uninstall (param) {
        this.uninstallCmd = new Uninstall(this, param);
        return this.uninstallCmd.exec();
    }
}

module.exports = PkgCopy;