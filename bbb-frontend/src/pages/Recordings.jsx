import React from "react";
import GetRecordingsForm from "../components/recordings/GetRecordingsForm";
import { useNavigate } from "react-router-dom";

function Recordings({ user, setCurrentPage }) {

    const navigate = useNavigate();
  return (
    <div className="flex flex-col space-y-4 max-w-md w-full">
      <button
        onClick={() => navigate("/dashboard")}
        className="bg-gray-700 hover:bg-gray-600 text-gray-100 font-semibold py-2 px-4 rounded-lg shadow-md transition-colors mb-4 flex items-center justify-center space-x-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <span>Back to Dashboard</span>
      </button>

      {/* Recordings list */}
      <GetRecordingsForm user={user} />
    </div>
  );
}

export default Recordings;
