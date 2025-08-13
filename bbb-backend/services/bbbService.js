const generateChecksum = require('../utils/checksum');
const BBB_URL = process.env.BBB_URL || 'https://test-install.blindsidenetworks.com/bigbluebutton/api/';

function buildJoinURL(meetingID, fullName, attendeePW) {
  const queryParams = `fullName=${encodeURIComponent(fullName)}&meetingID=${encodeURIComponent(meetingID)}&password=${encodeURIComponent(attendeePW)}&redirect=true`;
  const checksum = generateChecksum(queryParams, 'join');
  return `${BBB_URL}join?${queryParams}&checksum=${checksum}`;
}

function buildCreateMeetingURL(params) {
  const queryParams = new URLSearchParams(params).toString();
  const checksum = generateChecksum(queryParams, 'create');
  return `${BBB_URL}create?${queryParams}&checksum=${checksum}`;
}


function buildIsRunningURL(meetingID) {
  const query = `meetingID=${encodeURIComponent(meetingID)}`;
  const checksum = generateChecksum(query, 'isMeetingRunning');
  return `${BBB_URL}isMeetingRunning?${query}&checksum=${checksum}`;
}

function getMeetingURL(meetingID,fullName) {
  const queryParams = `fullName=${encodeURIComponent(fullName)}&meetingID=${encodeURIComponent(meetingID)}&password=moderatorPassword&redirect=true`;
  const checksum = generateChecksum(queryParams, 'join');
  return `${BBB_URL}join?${queryParams}&checksum=${checksum}`;
}

module.exports = {
  buildJoinURL,
  buildCreateMeetingURL,
  buildIsRunningURL,
  getMeetingURL
};
