const express = require('express');
const router = express.Router();
const { getAllWorks } = require('./works.controller');

router.get('/', getAllWorks);

module.exports = router;
