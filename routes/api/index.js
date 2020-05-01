const express = require('express');
const router = express.Router();
const auth = require('./auth');
const users = require('./users');
const samples = require('./samples');

router.use('/auth', auth);
router.use('/users', users);
router.use('/samples', samples);

module.exports = router;
