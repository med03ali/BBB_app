const { pool } = require('../config/db');

async function addRecord(record) {
    // We get all the data needed for the final insert.
    // The `meetingID` is the key to finding the session.
    const { record_id, url, meetingID } = record;

    if (!meetingID || !record_id || !url) {
        throw new Error('Missing required parameters: meetingID, record_id, or url');
    }

    let session;
    try {
        // Step 1: Query the 'sessions' table to find the session_id and created_at.
        const selectSql = 'SELECT id, created_at FROM sessions WHERE meeting_id = ?';
        const [rows] = await pool.query(selectSql, [meetingID]);

        if (rows.length === 0) {
            throw new Error(`Session with meeting_id ${meetingID} not found.`);
        }

        // We found the session. Get the session's ID and created_at timestamp.
        session = rows[0];
        const session_id = session.id;
        const created_at = session.created_at;

        // Step 2: Now, insert into the 'recordings' table using the fetched data.
        const insertSql = 'INSERT INTO recordings (session_id, record_id, url, is_public, created_at) VALUES (?, ?, ?, ?, ?)';
        const values = [
            session_id,
            record_id,
            url,
            false, 
            created_at
        ];

        const [results] = await pool.query(insertSql, values);

        console.log("Record added successfully:", results);
        return results;

    } catch (error) {
        console.error("Error in addRecord:", error.message);
        throw error; // Re-throw the error so the caller can handle it.
    }
}

module.exports = {
    addRecord
};
