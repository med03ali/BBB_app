const recordsService = require('../services/recordsService');


async function addRecord(req, res) {
  try {
    const record = req.body;

    if (!record || !record.recording_id || !record.recording_url || !record.meetingID) {
      return res.status(400).json({ error: 'Missing record details' });
    }
    
    await recordsService.addRecord(record);
    res.status(201).json({ message: 'Record added successfully' });
  } catch (error) {
    console.error('Error in addRecord controller:', error);
    res.status(500).json({ error: 'Failed to add record' });
  }
}

module.exports = {
  addRecord
};