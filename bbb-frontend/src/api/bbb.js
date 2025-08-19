import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/bbb';

function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function createMeeting(params) {
  return axios.get(`${API_BASE}/create`, {
    params,
    headers: getAuthHeaders(),
  });
}

export function joinMeeting(params) {
  return axios.get(`${API_BASE}/join`, {
    params,
    headers: getAuthHeaders(),
  });
}

export function saveMeetingToDb(params) {
    return axios.post(`http://localhost:5000/api/meetings/add`,
      params
    )
  }


export function isMeetingRunning(params) {
  return axios.get(`${API_BASE}/isRunning`, {
    params,
    headers: getAuthHeaders(),
  });
}

export function getRecordings(params) {
  return axios.get(`${API_BASE}/getRecordings`, {
    params,
    headers: getAuthHeaders(),
  });
}

export function addRecord(record) {
    return axios.post(`http://localhost:5000/api/records/add`,
      record
    )
}


export const deleteRecording = (recordId) => {
  return axios.get(`${API_BASE}/deleteRecordings`, {
    params: {
      recordId
    }
  });
};

export const deleteRecordFromDB = (recordId) => {
  return axios.post('http://localhost:5000/api/records/delete', {
    recordId: recordId
  });
};
