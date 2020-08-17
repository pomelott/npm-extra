const {logger} = require('../../lib/log');
const {getConf} = require('../../static/confHandler')
module.exports = (self, param) => {
    if (
        param.options[1] ||
        (param.options[0] !== '--list' && param.options[0] !== '-l')
    ) {
        logger.warn('you can do this with only <-l> or <--list>, other parameters are considered invalid ! i guess you want to show the list of configuration.')
    }
    logger.notice(`the configuration as follows:`);
    let confArgsIndex = param.options.indexOf('-l')
    if (confArgsIndex === -1) {
        confArgsIndex = param.options.indexOf('--list');
    }
    const targetArgs = param.args[confArgsIndex];
    if (targetArgs) {
        logger.info(`${targetArgs}: ${getConf(targetArgs)}`)
    } else {
        const conf = getConf();
        for (let key in conf) {
            logger.info(`${key}: ${conf[key]}`)
        }
    }
}