const crypto = require('crypto');
const BBB_SECRET = 'TMKvjTLILuPY5dwRuhykupLuc8MrkIAyHOcBjGfAQvE';

//process.env.BBB_SECRET || 

function generateChecksum(queryString, action) {
  const sha1 = crypto.createHash('sha1');
  sha1.update(action + queryString + BBB_SECRET);
  return sha1.digest('hex');
}

module.exports = generateChecksum;
