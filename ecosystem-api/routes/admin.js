const express = require('express');
const router = express.Router();
const { getDashboardData, addPlatform } = require('../controllers/adminController');

router.get('/data', getDashboardData);
router.post('/platforms', addPlatform);

module.exports = router;