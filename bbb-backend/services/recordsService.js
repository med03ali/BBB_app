const { pool } = require('../config/db');

async function addRecord(record) {
    
    const { record_id, url, meetingID } = record;

    if (!meetingID || !record_id || !url) {
        throw new Error('Missing required parameters: meetingID, record_id, or url');
    }

    try {
        
        const checkSql = 'SELECT id FROM recordings WHERE record_id = ?';
        
        
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

        
        const selectSql = 'SELECT id, created_at FROM sessions WHERE meeting_id = ?';
        
        
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

        
        const session = sessions[0];
        const session_id = session.id;
        const created_at = session.created_at;

        
        const insertSql = 'INSERT INTO recordings (session_id, record_id, url, is_public, created_at) VALUES (?, ?, ?, ?, ?)';
        const values = [
            session_id,
            record_id,
            url,
            false, 
            created_at
        ];

        
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
        throw error; 
    }
}

async function deleteRecord(recordId) {
    if (!recordId) {
        throw new Error('Missing required parameter: recordId');
    }

    try {
        const deleteSql = 'DELETE FROM recordings WHERE record_id = ?';
        
        const results = await new Promise((resolve, reject) => {
            pool.query(deleteSql, [recordId], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });

        console.log(`Record with record_id ${recordId} deleted successfully:`, results);
        return results;

    } catch (error) {
        console.error("Error in deleteRecord:", error.message);
        throw error; 
    }
}

module.exports = {
    addRecord,
    deleteRecord
};