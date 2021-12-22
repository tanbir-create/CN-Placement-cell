const express = require('express');
const router = express.Router();
const adminsRoute = require('./admins');
const studentsRoute = require('./students')
const companyRoute = require('./company')
const auth = require('../middlewares/auth');

router.use('/admin', adminsRoute)
router.use('/students', auth, studentsRoute)
router.use('/company', auth, companyRoute)

module.exports = router;