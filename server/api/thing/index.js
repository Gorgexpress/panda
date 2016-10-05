'use strict';

var express = require('express');
var controller = require('./thing.controller');

var router = express.Router();

router.get('/init', controller.init);
router.put('/edit', controller.edit);

module.exports = router;
