var express = require('express');
var router = express.Router();

router.use('/cons', require('./consultaion'));

module.exports = router;
