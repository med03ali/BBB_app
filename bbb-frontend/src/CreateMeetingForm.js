import React, { useState } from 'react';
import axios from 'axios';

const CreateMeetingForm = () => {
  const [formData, setFormData] = useState({
    meetingID: '',
    name: '',
    attendeePW: '',
    moderatorPW: '',
    fullName: '',
    welcome: '',
    voiceBridge: '',
    record: 'false',
    autoStartRecording: 'false',
    allowStartStopRecording: 'true',
    dialNumber: '',
    webVoice: '',
    logoutURL: '',
    maxParticipants: '',
    duration: '',
    userID: '',
    redirect: 'true'
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.get('http://localhost:5000/api/bbb/create', {
      params: formData
    });
    console.log('BBB Response:', res.data);
    alert('Meeting created. Check console for XML response.');
  } catch (error) {
    console.error('Error creating meeting:', error);
    alert('Failed to create meeting');
  }
};


  return (

    <form onSubmit={handleSubmit}>
      <h2>Create a Meeting</h2>

      <input name="meetingID" placeholder="Meeting ID" onChange={handleChange} />
      <input name="name" placeholder="Meeting Name" onChange={handleChange} />
      <input name="attendeePW" placeholder="Attendee Password" onChange={handleChange} />
      <input name="moderatorPW" placeholder="Moderator Password" onChange={handleChange} />
      <input name="fullName" placeholder="Full Name" onChange={handleChange} />
      <input name="welcome" placeholder="Welcome Message" onChange={handleChange} />
      <input name="voiceBridge" placeholder="Voice Bridge" onChange={handleChange} />
      <input name="dialNumber" placeholder="Dial Number" onChange={handleChange} />
      <input name="webVoice" placeholder="Web Voice" onChange={handleChange} />
      <input name="logoutURL" placeholder="Logout URL" onChange={handleChange} />
      <input name="maxParticipants" placeholder="Max Participants" onChange={handleChange} />
      <input name="duration" placeholder="Duration (minutes)" onChange={handleChange} />
      <input name="userID" placeholder="User ID" onChange={handleChange} />

      <select name="record" onChange={handleChange}>
        <option value="false">Record: No</option>
        <option value="true">Record: Yes</option>
      </select>

      <select name="redirect" onChange={handleChange}>
        <option value="false">Redirect: No</option>
        <option value="true">Redirect: Yes</option>
      </select>

      <select name="autoStartRecording" onChange={handleChange}>
        <option value="false">Auto Start Recording: No</option>
        <option value="true">Auto Start Recording: Yes</option>
      </select>

      <select name="allowStartStopRecording" onChange={handleChange}>
        <option value="false">Allow Start/Stop Recording: No</option>
        <option value="true">Allow Start/Stop Recording: Yes</option>
      </select>

      <button type="submit">Create Meeting</button>
    </form>




    
  );
};

export default CreateMeetingForm;
