const {Plog, LogLoading} = require('pomelo-toolbox').print;

module.exports.logger = new Plog({
    prefix: 'npme'
})

module.exports.Loading = LogLoading;