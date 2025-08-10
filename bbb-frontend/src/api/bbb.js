import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/bbb';

export function createMeeting(params) {
  return axios.get(`${API_BASE}/create`, { params });
}

export function joinMeeting(params) {
  return axios.get(`${API_BASE}/join`, { params });
}

export function isMeetingRunning(params) {
  return axios.get(`${API_BASE}/isRunning`, { params });
}
