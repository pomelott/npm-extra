const {Plog, LogLoading} = require('pomelo-toolbox').print;

module.exports.logger = new Plog({
    prefix: 'npm-extra'
})

module.exports.Loading = LogLoading;