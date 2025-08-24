const meetingsService = require('../services/meetingsService');


async function addMeeting(req, res) {
  try {
    const meeting = req.body;
    
    if (!meeting || !meeting.meeting_id || !meeting.meeting_name || !meeting.created_by) {
      return res.status(400).json({ error: 'Missing meeting details' });
    }
    
    await meetingsService.addMeeting(meeting);
    res.status(201).json({ message: 'Meeting added successfully' });
  } catch (error) {
    console.error('Error in addMeeting controller:', error);
    res.status(500).json({ error: 'Failed to add meeting' });
  }
}

module.exports = {
  addMeeting
};