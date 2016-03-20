var router = require('express').Router(),
    api = require('./api');

//api/ post类型
router.use('/api', api);

module.exports = router;