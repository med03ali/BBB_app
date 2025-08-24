import React, { useState, useEffect } from 'react';
import SignIn from './pages/SignIn';
import CreateMeetingForm from './components/CreateMeetingForm';
import JoinMeetingForm from './components/JoinMeetingForm';
import IsMeetingRunningForm from './components/IsMeetingRunningForm';
import GetRecordingsForm from './components/GetRecordingsForm';

function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');

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
    <div className="p-6 bg-gray-900 min-h-screen flex flex-col items-center justify-center space-y-8">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-xl shadow-lg flex justify-between items-center">
        <h1 className="text-2xl font-extrabold text-gray-100 leading-tight">
          Welcome, {user.fullName}
        </h1>
        <button
          onClick={() => {
            localStorage.clear();
            setUser(null);
            setCurrentPage('dashboard');
          }}
          className="bg-gray-700 hover:bg-gray-600 text-gray-100 font-semibold py-2 px-4 rounded-lg shadow-md transition-colors"
        >
          Sign Out
        </button>
      </div>

      <div className="flex flex-col space-y-4 max-w-md w-full">
        {currentPage === 'dashboard' && (
          <>
            <button
              onClick={() => setCurrentPage('meetings')}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-6 rounded-xl text-center shadow-lg transition-colors text-xl flex items-center justify-center space-x-3"
            >
              
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0a2 2 0 00-2 2v2m7-2h2m-2 2h2m-2-2v2m-2 0h-2" />
              </svg>
              <span>Meetings</span>
            </button>
            <button
              onClick={() => setCurrentPage('recordings')}
              className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 px-6 rounded-xl text-center shadow-lg transition-colors text-xl flex items-center justify-center space-x-3"
            >
              
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.26a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Recordings</span>
            </button>
          </>
        )}

        {currentPage === 'meetings' && (
          <>
            <button
              onClick={() => setCurrentPage('dashboard')}
              className="bg-gray-700 hover:bg-gray-600 text-gray-100 font-semibold py-2 px-4 rounded-lg shadow-md transition-colors mb-4 flex items-center justify-center space-x-2"
            >
              
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Dashboard</span>
            </button>
            {user.role === 'instructor' && <CreateMeetingForm user={user} />}
            {user.role === 'student' && <JoinMeetingForm user={user} />}
            <IsMeetingRunningForm user={user} />
          </>
        )}

        {currentPage === 'recordings' && (
          <>
            <button
              onClick={() => setCurrentPage('dashboard')}
              className="bg-gray-700 hover:bg-gray-600 text-gray-100 font-semibold py-2 px-4 rounded-lg shadow-md transition-colors mb-4 flex items-center justify-center space-x-2"
            >
              
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Dashboard</span>
            </button>
            <GetRecordingsForm user={user} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;