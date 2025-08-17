const express = require('express');
const router = express.Router();
const bbbController = require('../controllers/bbbController');
const auth = require('../middleware/auth');

router.get('/join', auth, bbbController.joinMeeting);
router.get('/create', auth, bbbController.createMeeting);
router.get('/isRunning', auth, bbbController.isMeetingRunning);
router.get('/getRecordings', auth, bbbController.getRecordings);


module.exports = router;
