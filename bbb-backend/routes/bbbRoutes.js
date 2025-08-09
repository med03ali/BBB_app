const express = require('express');
const crypto = require('crypto');
const axios = require('axios');

const router = express.Router();

const BBB_SECRET = '8cd8ef52e8e101574e400365b55e11a6';
const BBB_URL = 'https://test-install.blindsidenetworks.com/bigbluebutton/api';

function generateChecksum(queryString, action) {
  const sha1 = crypto.createHash('sha1');
  sha1.update(action + queryString + BBB_SECRET);
  return sha1.digest('hex');
}

router.post('/create', async (req, res) => {
  const params = req.body;

  const queryParams = new URLSearchParams(params).toString();
  const checksum = generateChecksum(queryParams, 'create');

  const finalUrl = `${BBB_URL}/create?${queryParams}&checksum=${checksum}`;

  try {
    const response = await axios.get(finalUrl);
    res.send(response.data); // XML string
  } catch (err) {
    console.error('Error creating meeting:', err.message);
    res.status(500).json({ error: 'Failed to create meeting' });
  }
});

module.exports = router;
