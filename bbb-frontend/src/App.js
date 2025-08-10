import React from 'react';
import CreateMeetingForm from './components/CreateMeetingForm';
import JoinMeetingForm from './components/JoinMeetingForm';
import IsMeetingRunningForm from './components/IsMeetingRunningForm';

function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>BigBlueButton Demo</h1>
      <CreateMeetingForm />
      <hr style={{ margin: '40px 0' }} />
      <JoinMeetingForm />
       <hr style={{ margin: '40px 0' }} />
      <IsMeetingRunningForm/>
    </div>
  );
}

export default App;
