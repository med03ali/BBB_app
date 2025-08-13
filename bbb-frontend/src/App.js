import React, { useState, useEffect } from 'react';
import SignIn from './pages/SignIn';
import CreateMeetingForm from './components/CreateMeetingForm';
import JoinMeetingForm from './components/JoinMeetingForm';
import IsMeetingRunningForm from './components/IsMeetingRunningForm';


function App() {
  const [user, setUser] = useState(null);

  // On app load, check if token exists in localStorage and parse user info
  useEffect(() => {
    const token = localStorage.getItem('token');
    const fullName = localStorage.getItem('fullName');
    const username = localStorage.getItem('username');
    if (token && fullName && username) {
      setUser({ token, fullName, username });
  }
}, []);

  if (!user) {
    return <SignIn onSignIn={(userData) => setUser(userData)} />;
  }

  return (
    <div>
      <h1>Welcome, {user.fullName}</h1>
      <button onClick={() => {
        localStorage.clear();
        setUser(null);
      }}>Sign Out</button>

      <CreateMeetingForm user={user} />
      <JoinMeetingForm user={user} />
      <IsMeetingRunningForm />
      {/* Other app components */}
    </div>
  );
}

export default App;
