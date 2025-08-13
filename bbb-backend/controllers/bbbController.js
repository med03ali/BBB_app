const { buildJoinURL, buildCreateMeetingURL, buildIsRunningURL,getMeetingURL } = require('../services/bbbService');
const axios = require('axios');
const xml2js = require('xml2js');

exports.joinMeeting = (req, res) => {
  const { meetingID, fullName, attendeePW } = req.query;

  if (!meetingID || !fullName || !attendeePW) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  try {
    const url = buildJoinURL(meetingID, fullName, attendeePW);
    res.json({ url });
  } catch (err) {
    console.error('Error joining meeting:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createMeeting = async (req, res) => {
  try {
    const url = buildCreateMeetingURL(req.query);
    // console.log(url);
    const meetingID = req.query.meetingID;
    const fullName = req.query.fullName;

    const meetingURL = getMeetingURL(meetingID,fullName);
    // Make the HTTP request to BBB API
    const response = await axios.get(url);
    
    
    res.json({
      xml: response.data,
      meetingURL: meetingURL
    });

    // res.send(response.data);
  } catch (err) {
    console.error('Error creating meeting:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.isMeetingRunning = async (req, res) => {
  const { meetingID } = req.query;

  if (!meetingID) {
    return res.status(400).json({ error: 'Missing meetingID parameter' });
  }

  try {
    const url = buildIsRunningURL(meetingID);
    const response = await axios.get(url);
    const xml = response.data;

    // Parse XML to JSON
    xml2js.parseString(xml, { explicitArray: false }, (err, result) => {
      if (err) {
        console.error('XML parsing error:', err);
        return res.status(500).json({ error: 'Failed to parse BBB response' });
      }

      const running = result.response.running === 'true';
      res.json({ running });
    });

  } catch (error) {
    console.error('Error fetching meeting status:', error.message);
    res.status(500).json({ error: 'Failed to check meeting status' });
  }
};
