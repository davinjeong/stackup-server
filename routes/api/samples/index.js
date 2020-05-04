const express = require('express');
const router = express.Router();
const { getSample } = require('./samples.controller');

router.get('/:shape', getSample);

module.exports = router;
