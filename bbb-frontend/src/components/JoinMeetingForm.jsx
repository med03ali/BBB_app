import React, { useState } from 'react';
import { joinMeeting } from '../api/bbb';

export default function JoinMeetingForm({user}) {
  const [formData, setFormData] = useState({
    meetingID: '',
    fullName: user.fullName,
    attendeePW: 'attendeePassword',
  });

  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

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
    <form onSubmit={handleSubmit} class="max-w-md mx-auto p-6 bg-white rounded-xl shadow-2xl space-y-4">
  <h2 class="text-2xl font-bold text-center text-gray-800">Join Meeting</h2>

  <input
    name="meetingID"
    placeholder="Meeting ID"
    value={formData.meetingID}
    onChange={handleChange}
    required
    class="block w-full px-4 py-2 text-center text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
  />

  {/* <input
    name="fullName"
    placeholder="Full Name"
    value={formData.fullName}
    onChange={handleChange}
    required
    class="block w-full px-4 py-2 text-center text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
  /> */}

  <div class="text-center">
    <button
      type="button"
      onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
      class="text-blue-500 hover:text-blue-700 font-medium py-2 px-4 inline-flex items-center transition-colors duration-200"
    >
      <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        {showAdvancedOptions ? (
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
        ) : (
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        )}
      </svg>
      {showAdvancedOptions ? 'Hide Password Field' : 'Show Password Field'}
    </button>
  </div>
    
  {showAdvancedOptions && (
    <input
      name="attendeePW"
      placeholder="Attendee Password (optional)"
      value={formData.attendeePW}
      onChange={handleChange}
      class="block w-full px-4 py-2 text-center text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
    />
  )}

  <button
    type="submit"
    class="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    Join Meeting
  </button>
</form>
  );
}
