const router = require('express').Router();
const { allocateInterview, setresultStatus } = require('../controllers/interview');

router.post('/:id', allocateInterview);
router.patch('/:id', setresultStatus );

module.exports = router;