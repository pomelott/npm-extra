
const {logger} = require('../lib/log');

class Init {
    constructor (parent, param) {
        this.parent = parent;
        this.param = param;
    }



    exec () {
        if (this.parent[this.param.cmdParam]) {
            return this.parent[this.param.cmdParam](this.param)
        } else {
            logger.log(`this.param.cmdParam doesn't exist !`, 5);
            return false;
        }
        
    }


}
module.exports = Init;