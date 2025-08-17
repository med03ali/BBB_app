// import React, { useState } from 'react';
// import { getRecordings } from '../api/bbb';

// export default function GetRecordingsForm() {
//   const [meetingID, setMeetingID] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!meetingID) {
//       alert('Please enter Meeting ID');
//       return;
//     }


//     try {
//       getRecordings({meetingID});
      
//     } catch (error) {
//       console.error('Error getting recording :', error);
//     } 
//   };

//   return (
//     <form onSubmit={handleSubmit} class="max-w-md mx-auto p-6 bg-white rounded-xl shadow-2xl space-y-4">
//   <h2 class="text-2xl font-bold text-center text-gray-800"></h2>

//   <input
//     type="text"
//     placeholder="Meeting ID"
//     value={meetingID}
//     onChange={(e) => setMeetingID(e.target.value)}
//     class="block w-full px-4 py-2 text-center text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//   />

//   <button type="submit" class="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
//     Get Recordings
//   </button>
// </form>
//   );

// }



import React, { useState } from 'react';
import { getRecordings } from '../api/bbb';

// Define a type for the recording data to make it easier to work with.
const initialRecordingData = {
  recordID: null,
  podcastUrl: null,
  presentationUrl: null,
  message: '',
};

export default function GetRecordingsForm() {
  const [meetingID, setMeetingID] = useState('');
  // State to store the fetched recording data from the backend.
  const [recordingData, setRecordingData] = useState(initialRecordingData);
  // State to handle loading status for a better user experience.
  const [isLoading, setIsLoading] = useState(false);
  // State to handle potential errors from the API call.
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!meetingID) {
      console.error('Please enter a Meeting ID.');
      // You could also set an error state here to display in the UI.
      return;
    }

    // Reset previous state before making a new request
    setRecordingData(initialRecordingData);
    setError(null);
    setIsLoading(true);

    try {
      // Axios will send the `meetingID` as a query parameter in the URL.
      // The backend controller will receive this via `req.query`.
      const response = await getRecordings({ meetingID });
      
      // The response.data now contains the clean JSON object from your backend.
      // We update the state with this data.
      setRecordingData(response.data);
      
      console.log('Recordings fetched successfully:', response.data);
      
    } catch (error) {
      console.error('Error getting recordings:', error);
      // Set the error state so you can display an error message to the user.
      setError('Failed to fetch recordings. Please check the Meeting ID.');
    } finally {
      // Always set loading to false after the request is complete.
      setIsLoading(false);
    } 
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-2xl space-y-4">
      <h2 className="text-2xl font-bold text-center text-gray-800">Get Recordings</h2>
      <input
        type="text"
        placeholder="Meeting ID"
        value={meetingID}
        onChange={(e) => setMeetingID(e.target.value)}
        className="block w-full px-4 py-2 text-center text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
      />
      <button 
        type="submit" 
        className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Get Recordings'}
      </button>

      {/* Conditional rendering based on the state */}
      {isLoading && (
        <div className="text-center text-gray-500">
          Fetching recordings...
        </div>
      )}

      {error && (
        <div className="text-center text-red-500">
          {error}
        </div>
      )}

      {/* Render the data only if it exists */}
      {recordingData.recordID && (
        <div className="p-4 bg-gray-100 rounded-lg space-y-2">
          <p className="font-semibold text-gray-700">Record ID:</p>
          <p className="text-sm break-all text-gray-600">{recordingData.recordID}</p>
          {recordingData.podcastUrl && (
            <>
              <p className="font-semibold text-gray-700">Podcast URL:</p>
              <a href={recordingData.podcastUrl} target="_blank" rel="noopener noreferrer" className="block text-sm break-all text-blue-500 hover:underline">
                {recordingData.podcastUrl}
              </a>
            </>
          )}
          {recordingData.presentationUrl && (
            <>
              <p className="font-semibold text-gray-700">Presentation URL:</p>
              <a href={recordingData.presentationUrl} target="_blank" rel="noopener noreferrer" className="block text-sm break-all text-blue-500 hover:underline">
                {recordingData.presentationUrl}
              </a>
            </>
          )}
        </div>
      )}

      {/* Display a message if no recordings were found */}
      {recordingData.message && !isLoading && (
        <div className="text-center text-gray-500">
          {recordingData.message}
        </div>
      )}
    </form>
  );
}