// import axios from 'axios';

// const API_BASE = 'http://localhost:5000/api/bbb';

// export function createMeeting(params) {
//   return axios.get(`${API_BASE}/create`, { params });
// }

// export function joinMeeting(params) {
//   return axios.get(`${API_BASE}/join`, { params });
// }

// export function isMeetingRunning(params) {
//   return axios.get(`${API_BASE}/isRunning`, { params });
// }

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


export function isMeetingRunning(params) {
  return axios.get(`${API_BASE}/isRunning`, {
    params,
    headers: getAuthHeaders(),
  });
}
