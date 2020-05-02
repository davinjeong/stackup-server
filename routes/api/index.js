const express = require('express');
const router = express.Router();
const auth = require('./auth');
const users = require('./users');
const samples = require('./samples');
const works = require('./works');

router.use('/auth', auth);
router.use('/users', users);
router.use('/samples', samples);
router.use('/works', works);

module.exports = router;
