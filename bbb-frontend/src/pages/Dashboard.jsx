import React from "react";
import { useNavigate } from "react-router-dom";


function Dashboard({ setCurrentPage }) {
    const navigate = useNavigate();

  return (
    <div className="flex flex-col space-y-4 max-w-md w-full">
      <button
        onClick={() => navigate("/meetings")}
        className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-6 rounded-xl text-center shadow-lg transition-colors text-xl flex items-center justify-center space-x-3"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 11H5m14 0a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0a2 2 0 00-2 2v2m7-2h2m-2 2h2m-2-2v2m-2 0h-2"
          />
        </svg>
        <span>Meetings</span>
      </button>

      <button
        onClick={() => navigate("/recordings")}
        className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 px-6 rounded-xl text-center shadow-lg transition-colors text-xl flex items-center justify-center space-x-3"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.26a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Recordings</span>
      </button>
    </div>
  );
}

export default Dashboard;
