const crypto = require('crypto');
const BBB_SECRET = process.env.BBB_SECRET || '8cd8ef52e8e101574e400365b55e11a6';

function generateChecksum(queryString, action) {
  const sha1 = crypto.createHash('sha1');
  sha1.update(action + queryString + BBB_SECRET);
  return sha1.digest('hex');
}

module.exports = generateChecksum;
