const {getConf} = require('../static');
const {classifyPkgCmd} = require('../lib/paramHandler');
const {logger} = require('../lib/log')
const Exec = require('./Exec')
const Config = require('./Config');
const Install = require('./Install');
const Init = require('./Init');
const Uninstall = require('./Uninstall');
const Help = require('./Help')
class PkgCopy {
    constructor (opt = {}) {
        this.opt = Object.assign({}, getConf(), opt);
        if (Object.keys(opt).length) {
            this.config({
                cmParam: 'config',
                objParam: opt
            })
        }
        
        
        this.execCmd = null;
        this.configCmd = null;
        this.initCmd = null;
        this.installCmd = null;
        this.uninstallCmd = null;
        this.helpCmd = null
    }

    exec (cmd) {
        let cmdArr = cmd.split(' '), param;
        if (cmdArr[0] !== 'pkg-copy') {
            logger.log(`${cmdArr[0]} doesn't exist !`, 5);
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