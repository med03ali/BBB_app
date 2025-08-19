const recordsService = require('../services/recordsService');


async function addRecord(req, res) {
  try {
    const record = req.body;

    if (!record || !record.record_id || !record.url || !record.meetingID) {
      return res.status(400).json({ error: 'Missing record details' });
    }
    
    await recordsService.addRecord(record);
    res.status(201).json({ message: 'Record added successfully' });
  } catch (error) {
    console.error('Error in addRecord controller:', error);
    res.status(500).json({ error: 'Failed to add record' });
  }
}

async function deleteRecord(req, res) {
  try {
    const { recordId } = req.body;
    
    if (!recordId){
      return res.status(400).json({ error: 'Missing record id' });
    }

    await recordsService.deleteRecord(recordId);
    res.status(201).json({ message: 'Record deleted successfully' });
  } catch(error){
    console.error('Error in deleteRecord controller:',error);
    res.status(500).json({ error: 'Failed to delete record' });
  }
}

module.exports = {
  addRecord,
  deleteRecord
};