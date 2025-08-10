import React, { useState } from 'react';
import { createMeeting } from '../api/bbb';

export default function CreateMeetingForm() {
  const [formData, setFormData] = useState({
    meetingID: '',
    name: '',
    fullName: '',
    attendeePW: '',
    moderatorPW: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.meetingID || !formData.name) {
      alert('Please enter Meeting ID and Meeting Name.');
      return;
    }

    try {
      const response = await createMeeting(formData);
      console.log('Meeting created:', response.data);
      alert('Meeting created! Check console for response.');
    } catch (error) {
      console.error('Error creating meeting:', error);
      alert('Failed to create meeting');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>Create Meeting</h2>

      <input
        name="meetingID"
        placeholder="Meeting ID"
        value={formData.meetingID}
        onChange={handleChange}
        required
        style={{ display: 'block', marginBottom: 10, width: '100%' }}
      />

      <input
        name="name"
        placeholder="Meeting Name"
        value={formData.name}
        onChange={handleChange}
        required
        style={{ display: 'block', marginBottom: 10, width: '100%' }}
      />

      <input
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}
        style={{ display: 'block', marginBottom: 10, width: '100%' }}
      />

      <input
        name="attendeePW"
        placeholder="Attendee Password"
        value={formData.attendeePW}
        onChange={handleChange}
        style={{ display: 'block', marginBottom: 10, width: '100%' }}
      />

      <input
        name="moderatorPW"
        placeholder="Moderator Password"
        value={formData.moderatorPW}
        onChange={handleChange}
        style={{ display: 'block', marginBottom: 10, width: '100%' }}
      />

      <button type="submit" style={{ padding: '8px 16px' }}>
        Create Meeting
      </button>
    </form>
  );
}
