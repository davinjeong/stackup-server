const express = require('express');
const router = express.Router();
const { getSamples } = require('./samples.controller');

router.get('/:shape', getSamples);

module.exports = router;
