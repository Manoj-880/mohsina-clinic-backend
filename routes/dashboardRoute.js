const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

router.post('/', dashboardController.getDashboardData);

module.exports = router;