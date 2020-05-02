const express = require('express');
const router = express.Router();
const authentication = require('../../../middlewares/authentication');
const { registerWork, modifyWork } = require('./users.controller');

router.post('/:user_id/work', authentication, registerWork);
router.put('/:user_id/works/:work_id', authentication, modifyWork);

module.exports = router;
