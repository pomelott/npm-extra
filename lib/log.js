const {Plog, LogLoading} = require('pomelo-toolbox').print;

module.exports.logger = new Plog({
    prefix: 'package-copy(包副本)'
})

module.exports.Loading = LogLoading;