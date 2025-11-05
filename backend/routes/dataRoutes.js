const express = require('express');
const router = express.Router();
const {
  getData,
  getFilterOptions,
  getStats
} = require('../controllers/dataController');

// Routes
router.get('/data', getData);
router.get('/filters', getFilterOptions);
router.get('/stats', getStats);

module.exports = router;