const express = require('express');
const router = express.Router();
const recordsController = require('../controllers/recordsController');
const auth = require('../middleware/auth');

router.post('/add', recordsController.addRecord);
router.post('/delete', recordsController.deleteRecord);


module.exports = router;
