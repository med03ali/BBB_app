const { buildJoinURL, buildCreateMeetingURL, buildIsRunningURL,getMeetingURL, buildgetRecordingsURL, buildDeleteRecordingURL } = require('../services/bbbService');
const axios = require('axios');
const xml2js = require('xml2js');
const parser = new xml2js.Parser({ explicitArray: false, ignoreAttrs: true });

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
    
    console.log(url);
    
    const meetingID = req.query.meetingID;
    const fullName = req.query.fullName;

    const meetingURL = getMeetingURL(meetingID,fullName);
    
    const response = await axios.get(url);
    
    
    res.json({
      xml: response.data,
      meetingURL: meetingURL
    });

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

exports.getRecordings = async (req, res) => {
    const { meetingID } = req.query;

    if (!meetingID) {
        return res.status(400).json({ error: 'Missing meetingID parameter' });
    }

    try {
        const url = buildgetRecordingsURL(meetingID);
        const response = await axios.get(url);
        const xml = response.data;
        const result = await parser.parseStringPromise(xml);

        const recordings = result?.response?.recordings?.recording;
        
        if (!recordings) {
            return res.json([]);
        }

        const recordingsArray = Array.isArray(recordings) ? recordings : [recordings];

        const processedRecordings = recordingsArray.map(recording => {
            const recordID = recording.recordID;
            const formats = recording.playback?.format;

            let podcastUrl = null;
            let presentationUrl = null;

            const formatsArray = Array.isArray(formats) ? formats : [formats];
            
            formatsArray.forEach(format => {
                if (format?.type === 'podcast') {
                    podcastUrl = format.url;
                }
                if (format?.type === 'presentation') {
                    presentationUrl = format.url;
                }
            });

            return {
                recordID,
                podcastUrl,
                presentationUrl
            };
        });

        res.json(processedRecordings);

    } catch (error) {
        console.error('Error getting recordings:', error.message);
        res.status(500).json({ error: 'Failed to get recordings' });
    }
};

exports.deleteRecordings = async(req, res) =>{
  const {recordId} = req.query;

  if(!recordId){
    return res.status(400).json({ error: 'Missing recordId parameter' });
  }

  try{
    const url = buildDeleteRecordingURL(recordId);
    const response = await axios.get(url);
    res.json(response.data);

  } catch(error){
      console.error('Error in deleteRecordings',error.message);
      res.status(500).json({error : 'Failed to delete recording'});
    }
}
