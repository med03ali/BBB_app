import React, { useState, useEffect } from 'react';
import SignIn from './pages/SignIn';
import CreateMeetingForm from './components/CreateMeetingForm';
import JoinMeetingForm from './components/JoinMeetingForm';
import IsMeetingRunningForm from './components/IsMeetingRunningForm';
import GetRecordingsForm from './components/GetRecordingsForm';


function App() {
  const [user, setUser] = useState(null);

  // On app load, check if token exists in localStorage and parse user info
  useEffect(() => {
    const token = localStorage.getItem('token');
    const fullName = localStorage.getItem('fullName');
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role');
    const id = localStorage.getItem('id');
    if (token && fullName && username) {
      setUser({ token, fullName, username, role, id });
  }
}, []);

  if (!user) {
    return <SignIn onSignIn={(userData) => setUser(userData)} />;
  }

  return (
    
  <div class="p-6 bg-gray-900 min-h-screen flex flex-col items-center justify-center space-y-8">

  <div class="w-full max-w-md bg-gray-800 p-6 rounded-xl shadow-lg flex justify-between items-center">
    <h1 class="text-2xl font-extrabold text-gray-100 leading-tight">
      Welcome, {user.fullName}
    </h1>
    <button
      onClick={() => {
        localStorage.clear();
        setUser(null);
      }}
      class="bg-gray-700 hover:bg-gray-600 text-gray-100 font-semibold py-2 px-4 rounded-lg shadow-md transition-colors"
    >
      Sign Out
    </button>
  </div>


  <div class="flex flex-col space-y-4 max-w-md w-full">
    {user.role === 'instructor' && <CreateMeetingForm user={user} />}
    {user.role === 'student' && <JoinMeetingForm user={user} />}
    <IsMeetingRunningForm user={user} />
    <GetRecordingsForm user={user}/>
  </div>
  
  </div>
  );
}

export default App;
