const express = require('express');
const router = express.Router();
const meetingsController = require('../controllers/meetingsController');
const auth = require('../middleware/auth');

router.post('/add', meetingsController.addMeeting);


module.exports = router;