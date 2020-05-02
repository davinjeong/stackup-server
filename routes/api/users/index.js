const express = require('express');
const router = express.Router();
const authentication = require('../../../middlewares/authentication');
const { registerWork, modifyWork, deleteWork } = require('./users.controller');

router.post('/:user_id/work', authentication, registerWork);
router.put('/:user_id/works/:work_id', authentication, modifyWork);
router.delete('/:user_id/works/:work_id', authentication, deleteWork);

module.exports = router;
