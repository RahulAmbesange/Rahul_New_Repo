const express = require('express');
const { saveResult, getResult } = require('../controllers/resultController');
const router = express.Router();

router.post('/save', saveResult);
router.get('/:userId', getResult);

module.exports = router;
