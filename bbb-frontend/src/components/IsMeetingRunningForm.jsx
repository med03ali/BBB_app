import React, { useState } from 'react';
import { isMeetingRunning } from '../api/bbb';

export default function IsMeetingRunningForm() {
  const [meetingID, setMeetingID] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!meetingID) {
      alert('Please enter Meeting ID');
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const res = await isMeetingRunning({ meetingID });
      // res.data is likely XML; you may want to parse it on backend or frontend
      // For simplicity, assume backend returns JSON with { running: true/false }
      setStatus(res.data.running ? 'Meeting is running' : 'Meeting is NOT running');
    } catch (error) {
      console.error('Error checking meeting status:', error);
      setStatus('Error checking meeting status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} class="max-w-md mx-auto p-6 bg-white rounded-xl shadow-2xl space-y-4">
  <h2 class="text-2xl font-bold text-center text-gray-800">Check if a meeting is running</h2>

  <input
    type="text"
    placeholder="Meeting ID"
    value={meetingID}
    onChange={(e) => setMeetingID(e.target.value)}
    class="block w-full px-4 py-2 text-center text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
  />

  <button type="submit" disabled={loading} class="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
    {loading ? 'Checking...' : 'Check Status'}
  </button>

  {status && <p class="mt-4 text-center text-gray-600">{status}</p>}
</form>
  );
}
