import React, { useState } from 'react';
import axios from 'axios';

export default function SignIn({ onSignIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await axios.post('http://localhost:5000/api/auth/signin', {
        username,
        password,
      });
      const { token, fullName } = res.data;

      // Save token and user info in localStorage for persistence
      localStorage.setItem('token', token);
      localStorage.setItem('fullName', fullName);
      localStorage.setItem('username', username);

      // Notify parent component
      onSignIn({ token, fullName, username });
    } catch (err) {
      setError(err.response?.data?.message || 'Sign in failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>Sign In</h2>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
        style={{ marginBottom: 10, width: '100%' }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        style={{ marginBottom: 10, width: '100%' }}
      />

      <button type="submit" style={{ padding: '8px 16px' }}>
        Sign In
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}
