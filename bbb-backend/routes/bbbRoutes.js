const express = require('express');
const router = express.Router();
const bbbController = require('../controllers/bbbController');

router.get('/join', bbbController.joinMeeting);
router.get('/create', bbbController.createMeeting);
router.get('/isRunning', bbbController.isMeetingRunning);

module.exports = router;
