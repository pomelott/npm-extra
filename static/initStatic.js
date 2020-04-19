const {setConf, getConf} = require('./confHandler');
const path = require('path');
module.exports.initStatic = () => {
    if (!getConf('initOk')) {
        setConf({
            'initOk': true,
            'json': path.resolve(__dirname, '../package-copy.json'),
            'root': process.cwd()
        });
    }
    
}
