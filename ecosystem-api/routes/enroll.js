const express = require('express');
const router = express.Router();
const { handleEnrollment } = require('../controllers/enrollController');
const { apiKeyAuth } = require('../utils/apiKeyAuth');

router.post('/', apiKeyAuth, handleEnrollment);

module.exports = router;