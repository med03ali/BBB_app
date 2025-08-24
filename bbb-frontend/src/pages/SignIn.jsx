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
      const { token, fullName, role, id } = res.data;

      
      localStorage.setItem('token', token);
      localStorage.setItem('fullName', fullName);
      localStorage.setItem('username', username);
      localStorage.setItem('role', role);
      localStorage.setItem('id',id);

      
      onSignIn({ token, fullName, username,role, id });
    } catch (err) {
      setError(err.response?.data?.message || 'Sign in failed');
    }
  };

  return (
    <div class="bg-gray-900 min-h-screen flex items-center justify-center p-6">
  <form onSubmit={handleSubmit} class="w-full max-w-md p-6 bg-gray-800 rounded-xl shadow-2xl space-y-4">
    <h2 class="text-2xl font-bold text-center text-gray-100">Sign In</h2>

    <input
      type="text"
      placeholder="Username"
      value={username}
      onChange={e => setUsername(e.target.value)}
      required
      class="block w-full px-4 py-2 text-gray-100 bg-gray-700 border border-gray-600 rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
    />

    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={e => setPassword(e.target.value)}
      required
      class="block w-full px-4 py-2 text-gray-100 bg-gray-700 border border-gray-600 rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
    />

    <button type="submit" class="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
      Sign In
    </button>

    {error && <p class="mt-4 text-center text-red-400">{error}</p>}
  </form>
</div>
  );
}
