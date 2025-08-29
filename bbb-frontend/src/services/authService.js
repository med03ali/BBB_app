import axios from 'axios';

const API_AUTH_URL = process.env.REACT_APP_API_AUTH_URL;

// const API_BASE_URL = 'http://localhost:5000/api';

export const signIn = async (username, password) => {
  try {
    const res = await axios.post(`${API_AUTH_URL}/auth/signin`, {
      username,
      password,
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};