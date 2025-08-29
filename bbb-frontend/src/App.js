
import React, { useState, useEffect } from 'react';
import SignIn from './pages/SignIn';
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Meetings from "./pages/Meetings";
import Recordings from "./pages/Recordings";

function App() {
  const [user, setUser] = useState(null);

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
    <BrowserRouter>
      <div className="p-6 bg-gray-900 min-h-screen flex flex-col items-center justify-center space-y-8">
        {/* Header */}
        {user && (
          <div className="w-full max-w-md bg-gray-800 p-6 rounded-xl shadow-lg flex justify-between items-center">
            <h1 className="text-2xl font-extrabold text-gray-100 leading-tight">
              Welcome, {user.fullName}
            </h1>
            <button
              onClick={() => {
                localStorage.clear();
                setUser(null);
                // Later we'll redirect to /signin with useNavigate
              }}
              className="bg-gray-700 hover:bg-gray-600 text-gray-100 font-semibold py-2 px-4 rounded-lg shadow-md transition-colors"
            >
              Sign Out
            </button>
          </div>
        )}

        {/* Pages */}
        <div className="flex flex-col space-y-4 max-w-md w-full">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/meetings" element={<Meetings user={user} />} />
            <Route path="/recordings" element={<Recordings user={user} />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

