const { pool } = require('../config/db'); 

async function addMeeting(meeting) {
  const { meeting_id, meeting_name, created_by, attendee_pw, moderator_pw } = meeting;
  const now = new Date();
  const start_time = now.toISOString().slice(0, 19).replace('T', ' '); 

  const sql = 'INSERT INTO sessions ( title, meeting_id, creator_id, moderator_pw, attendee_pw, created_at) VALUES (?, ?, ?, ?, ?, ?)';

const values = [meeting_name,
    meeting_id,
    created_by,
    moderator_pw,
    attendee_pw,
    start_time] ;

  return new Promise((resolve, reject) => {
    
    pool.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error adding meeting to MySQL:", error);
        return reject(error);
      }
      console.log("Meeting added successfully:", results);
      resolve(results);
    });
  });
}

module.exports = {
  addMeeting
};
