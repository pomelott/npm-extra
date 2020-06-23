/*
 * @Author: Tate
 * @Date: 2020-03-28 21:15:20
 * @LastEditors: Tate
 * @LastEditTime: 2020-06-23 10:49:49
 * @Description: 
 */ 
const {getConf, setConf} = require('../static');
const {classifyPkgCmd} = require('../lib/paramHandler');
const {logger} = require('../lib/log')
const Exec = require('./Exec')
const Config = require('./Config');
const Install = require('./Install');
const Init = require('./Init');
const Uninstall = require('./Uninstall');
const Help = require('./Help')
const path = require('path');
class PkgCopy {
    constructor (opt = {}) {
        this.opt = Object.assign({}, getConf(), opt);
        if (Object.keys(opt).length) {
            this.config({
                cmdParam: 'config',
                objParam: opt
            })
        }
        
        this.opt.root = process.cwd();
        this.opt.json = path.resolve(this.opt.root, './package-ek.json');
        setConf({
            root: this.opt.root,
            json: this.opt.json
        })
        this.execCmd = null;
        this.configCmd = null;
        this.initCmd = null;
        this.installCmd = null;
        this.uninstallCmd = null;
        this.helpCmd = null;
       
    }

    exec (cmd) {
        let cmdArr = cmd.split(' '), param;
        if (cmdArr[0] !== 'pkg-copy') {
            logger.error(`${cmdArr[0]} doesn't exist !`);
            return false;
        }
        cmdArr.unshift('node');
        param = classifyPkgCmd(cmdArr);
        
        this.execCmd = new Exec(this, param);
        return this.execCmd.exec()
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

    help (param) {
        this.helpCmd = new Help(this, param);
        return this.helpCmd.exec();
    }
}

module.exports = PkgCopy;