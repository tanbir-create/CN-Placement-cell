const express = require('express');
const router = express.Router();
const adminsRoute = require('./admins');
const studentsRoute = require('./students')

router.use('/admins', adminsRoute)
router.use('/students', studentsRoute)
// router.get('/api/')

module.exports = router;