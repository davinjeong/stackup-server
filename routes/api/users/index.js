const express = require('express');
const router = express.Router();
const authentication = require('../../../middlewares/authentication');
const { registerWork } = require('./users.controller');

router.post('/:user_id/work', authentication, registerWork);

module.exports = router;
