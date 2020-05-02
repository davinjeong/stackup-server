const express = require('express');
const router = express.Router();
const { getAllWorks, getWork } = require('./works.controller');

router.get('/', getAllWorks);
router.get('/:work_id', getWork)

module.exports = router;
