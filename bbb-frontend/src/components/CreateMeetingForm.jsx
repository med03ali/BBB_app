import React, { useState } from 'react';
import { createMeeting } from '../api/bbb';

export default function CreateMeetingForm({user}) {
  const [formData, setFormData] = useState({
    meetingID: crypto.randomUUID(),
    name: '',
    fullName: user.fullName,
    attendeePW: 'attendeePassword',
    moderatorPW: 'moderatorPassword',
  });

  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const [submitted, setSubmitted] = useState(false);
  const [meetingURL, setMeetingURL] = useState(''); 
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.meetingID || !formData.name) {
      alert('Please enter Meeting ID and Meeting Name.');
      return;
    }

    try {
      const response = await createMeeting(formData);
      console.log('Meeting created:', response.data.xml);
      alert('Meeting created! Check console for response.');
      setSubmitted(true);
      setMeetingURL(response.data.meetingURL)
    } catch (error) {
      console.error('Error creating meeting:', error);
      alert('Failed to create meeting');
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formData.meetingID);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset "Copied!" message after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  

  return (
    <form onSubmit={handleSubmit} class="max-w-md mx-auto p-6 bg-white rounded-xl shadow-2xl space-y-4">
  <h2 class="text-2xl font-bold text-center text-gray-800">
    How about you create a meeting?
  </h2>

  {/* <input
    name="meetingID"
    placeholder="Meeting ID"
    value={formData.meetingID}
    onChange={handleChange}
    required
    class="block w-full px-4 py-2 text-center text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
  /> */}

  <input
    name="name"
    placeholder="Meeting Name"
    value={formData.name}
    onChange={handleChange}
    required
    class="block w-full px-4 py-2 text-center text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
  />

  {/* <input
    name="fullName"
    placeholder="Full Name"
    value={formData.fullName}
    onChange={handleChange}
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
      {showAdvancedOptions ? 'Hide advanced options' : 'Show advanced options'}
    </button>
  </div>

  {showAdvancedOptions && (
    <div class="space-y-4">
      <input
        name="attendeePW"
        placeholder="Attendee Password"
        value={formData.attendeePW}
        onChange={handleChange}
        class="block w-full px-4 py-2 text-center text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
      />
      
      <input
        name="moderatorPW"
        placeholder="Moderator Password"
        value={formData.moderatorPW}
        onChange={handleChange}
        class="block w-full px-4 py-2 text-center text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
      />
    </div>
  )}

  <button
    type="submit"
    class="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    Create Meeting
  </button>

  {submitted && (
    <div class="mt-4">
      <div class="bg-gray-100 p-4 rounded-lg text-center shadow-inner">
            <p class="text-gray-700 font-medium">Meeting ID</p>
            <p class="text-xl font-bold text-blue-600 mt-1">{formData.meetingID}</p>
            <button
                type="button"
                onClick={handleCopy}
                class="ml-4 px-3 py-1 text-sm bg-blue-200 text-blue-800 font-semibold rounded-lg hover:bg-blue-300 transition-colors"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
          </div>
      {/* <p class="text-center text-gray-600">Here is the URL : {meetingURL} </p> */}
      <a 
            href={meetingURL} 
            target="_blank" 
            rel="noopener noreferrer" 
            class="block w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white font-bold py-3 px-6 rounded-full shadow-lg text-center transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl active:scale-95"
          >
            Join My Meeting
          </a>
    </div>
  )} 
</form>

    
  );


  
}


