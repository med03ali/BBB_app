import React, { useState } from 'react';
import { joinMeeting } from '../api/bbb';

export default function JoinMeetingForm() {
  const [formData, setFormData] = useState({
    meetingID: '',
    fullName: '',
    attendeePW: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.meetingID || !formData.fullName) {
      alert('Please enter Meeting ID and Full Name.');
      return;
    }

    try {
      const response = await joinMeeting(formData);
      const joinUrl = response.data.url || response.data;

      if (!joinUrl) {
        alert('No join URL returned from server.');
        return;
      }

      window.location.href = joinUrl;
    } catch (error) {
      console.error('Error joining meeting:', error);
      alert('Failed to join meeting');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>Join Meeting</h2>

      <input
        name="meetingID"
        placeholder="Meeting ID"
        value={formData.meetingID}
        onChange={handleChange}
        required
        style={{ display: 'block', marginBottom: 10, width: '100%' }}
      />

      <input
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}
        required
        style={{ display: 'block', marginBottom: 10, width: '100%' }}
      />

      <input
        name="attendeePW"
        placeholder="Attendee Password (optional)"
        value={formData.attendeePW}
        onChange={handleChange}
        style={{ display: 'block', marginBottom: 10, width: '100%' }}
      />

      <button type="submit" style={{ padding: '8px 16px' }}>
        Join Meeting
      </button>
    </form>
  );
}
