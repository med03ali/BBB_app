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
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>Is Meeting Running?</h2>

      <input
        type="text"
        placeholder="Meeting ID"
        value={meetingID}
        onChange={(e) => setMeetingID(e.target.value)}
        style={{ display: 'block', marginBottom: 10, width: '100%' }}
      />

      <button type="submit" disabled={loading} style={{ padding: '8px 16px' }}>
        {loading ? 'Checking...' : 'Check Status'}
      </button>

      {status && <p style={{ marginTop: 10 }}>{status}</p>}
    </form>
  );
}
