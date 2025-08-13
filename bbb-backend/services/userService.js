const db = require('../config/db');

async function findUserByUsername(username) {
  return new Promise((resolve, reject) => {
    db.pool.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
}



module.exports = { findUserByUsername };
