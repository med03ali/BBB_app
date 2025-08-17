const { pool } = require('../config/db');

async function addRecord(record) {
    // We get all the data needed for the final insert.
    // The `meetingID` is the key to finding the session.
    const { record_id, url, meetingID } = record;

    if (!meetingID || !record_id || !url) {
        throw new Error('Missing required parameters: meetingID, record_id, or url');
    }

    try {
        // Step 1: Check if the recording already exists.
        const checkSql = 'SELECT id FROM recordings WHERE record_id = ?';
        
        // Wrap the callback-based pool.query in a Promise to use with await.
        const existingRecords = await new Promise((resolve, reject) => {
            pool.query(checkSql, [record_id], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });

        if (existingRecords.length > 0) {
            console.log(`Recording with record_id ${record_id} already exists. Skipping insertion.`);
            return { message: 'Recording already exists, skipping insertion.' };
        }

        // Step 2: If the recording does not exist, find the session ID.
        const selectSql = 'SELECT id, created_at FROM sessions WHERE meeting_id = ?';
        
        // Wrap the callback-based pool.query in a Promise to use with await.
        const sessions = await new Promise((resolve, reject) => {
            pool.query(selectSql, [meetingID], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });

        if (sessions.length === 0) {
            throw new Error(`Session with meeting_id ${meetingID} not found.`);
        }

        // We found the session. Get the session's ID and created_at timestamp.
        const session = sessions[0];
        const session_id = session.id;
        const created_at = session.created_at;

        // Step 3: Insert into the 'recordings' table using the fetched data.
        const insertSql = 'INSERT INTO recordings (session_id, record_id, url, is_public, created_at) VALUES (?, ?, ?, ?, ?)';
        const values = [
            session_id,
            record_id,
            url,
            false, 
            created_at
        ];

        // Wrap the callback-based pool.query in a Promise to use with await.
        const results = await new Promise((resolve, reject) => {
            pool.query(insertSql, values, (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });

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