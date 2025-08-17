// import React, { useState } from 'react';
// import { getRecordings, addRecord } from '../api/bbb';

// // Define a type for the recording data to make it easier to work with.
// const initialRecordingData = {
//   recordID: null,
//   podcastUrl: null,
//   presentationUrl: null,
//   message: '',
// };



// export default function GetRecordingsForm() {
//   const [meetingID, setMeetingID] = useState('');
//   // State to store the fetched recording data from the backend.
//   const [recordingData, setRecordingData] = useState(initialRecordingData);
//   // State to handle loading status for a better user experience.
//   const [isLoading, setIsLoading] = useState(false);
//   // State to handle potential errors from the API call.
//   const [error, setError] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!meetingID) {
//       console.error('Please enter a Meeting ID.');
//       return;
//     }

    

//     setRecordingData(initialRecordingData);
//     setError(null);
//     setIsLoading(true);

//     try {
//       // Step 1: Fetch the recordings from the backend.


      




      
//       // Step 2: Check if the response contains a record ID.
//       // This is the key change to handle the "No recordings found" case.
//       if (fetchedData.recordID === null) {
//         // If there's no recordID, it means no recordings were found.
//         // We set the entire fetchedData object, which contains the message.
//         setRecordingData(fetchedData);
//         return;
//       }
      
//       // Step 3: If a recording was found, process the rest.
//       console.log('Recordings fetched successfully:', fetchedData);
      
//       // We will prefer the presentation URL if available, otherwise use podcast.
//       const recordUrl = fetchedData.presentationUrl || fetchedData.podcastUrl;
//       const record = {
//         record_id: fetchedData.recordID,
//         url: recordUrl,
//         meetingID: meetingID, // Use the original meeting ID from the form
//       };

//       console.log(record);
      
//       // Call the addRecord function to store the data in the database.
//       await addRecord(record);
//       console.log('Record added to database successfully:', record);
      
//       // Finally, set the data in state for display.
//       setRecordingData(fetchedData);
      
//     } catch (error) {
//       console.error('Error in handleSubmit:', error);
//       setError('Failed to process recordings. Please try again.');
//     } finally {
//       setIsLoading(false);
//     } 
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-2xl space-y-4">
//       <h2 className="text-2xl font-bold text-center text-gray-800">Get Recordings</h2>
//       <input
//         type="text"
//         placeholder="Meeting ID"
//         value={meetingID}
//         onChange={(e) => setMeetingID(e.target.value)}
//         className="block w-full px-4 py-2 text-center text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//       />
//       <button 
//         type="submit" 
//         className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
//         disabled={isLoading}>
//         {isLoading ? 'Loading...' : 'Get Recordings'}
//       </button>

//       {isLoading && (
//         <div className="text-center text-gray-500">
//           Fetching and processing recordings...
//         </div>
//       )}

//       {error && (
//         <div className="text-center text-red-500">
//           {error}
//         </div>
//       )}

//       {recordingData.recordID && (
//         <div className="p-4 bg-gray-100 rounded-lg space-y-2">
//           <p className="font-semibold text-gray-700">Record ID:</p>
//           <p className="text-sm break-all text-gray-600">{recordingData.recordID}</p>
//           {recordingData.podcastUrl && (
//             <>
//               <p className="font-semibold text-gray-700">Podcast URL:</p>
//               <a href={recordingData.podcastUrl} target="_blank" rel="noopener noreferrer" className="block text-sm break-all text-blue-500 hover:underline">
//                 {recordingData.podcastUrl}
//               </a>
//             </>
//           )}
//           {recordingData.presentationUrl && (
//             <>
//               <p className="font-semibold text-gray-700">Presentation URL:</p>
//               <a href={recordingData.presentationUrl} target="_blank" rel="noopener noreferrer" className="block text-sm break-all text-blue-500 hover:underline">
//                 {recordingData.presentationUrl}
//               </a>
//             </>
//           )}
//         </div>
//       )}

//       {recordingData.message && !isLoading && (
//         <div className="text-center text-gray-500">
//           {recordingData.message}
//         </div>
//       )}
//     </form>
//   );
// }


// src/components/GetRecordingsForm.jsx
import React, { useState } from 'react';
// We'll still import addRecord, but we'll create a mock for it.
import { getRecordings, addRecord } from '../api/bbb';

// The state will now be an array, so we can store multiple recordings.
const initialRecordingData = [];

// Mock the API response to test the success case with multiple recordings.
const mockResponse = {
  data: [
    {
      recordID: 'ffbfc4cc24428694e8b53a4-1530718721124',
      podcastUrl: 'https://demo.bigbluebutton.org/podcast/ffbfc4cc24428694e8b53a4e144f414052431693-1530718721124/audio.ogg',
      presentationUrl: 'https://demo.bigbluebutton.org/playback/presentation/2.0/playback.html?meetingId=ffbfc4cc24428694e8b53a4e144f414052431693-1530718721124',
      message: '',
    },
    {
      recordID: 'anothe90',
      podcastUrl: null, // Simulate a recording with only a presentation format.
      presentationUrl: 'https://demo.bigbluebutton.org/playback/presentation/2.0/playback.html?meetingId=another-meeting-id-12345-67890',
      message: '',
    }
  ]
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
      return;
    }

    setRecordingData(initialRecordingData);
    setError(null);
    setIsLoading(true);

    try {
      // Step 1: Fetch the recordings from the backend.
      // const response = await getRecordings({ meetingID });
      // const fetchedData = response.data;

      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate 1.5s network delay
      const fetchedData = mockResponse.data;
      
      // Step 2: Check if the response is an object with a 'message' property.
      // This is the key change to handle the "No recordings found" case.
      if (typeof fetchedData === 'object' && fetchedData !== null && fetchedData.hasOwnProperty('message')) {
        setRecordingData(fetchedData);
        return;
      }
      
      // Step 3: If a recording was found, process the rest.
      // Now we can safely loop over the data, as we know it's an array.
      for (const recording of fetchedData) {
        // ... The rest of your processing logic remains the same.
        console.log('Recordings fetched successfully:', recording);
        
        const recordUrl = recording.presentationUrl || recording.podcastUrl;
        
        const record = {
          record_id: recording.recordID,
          url: recordUrl,
          meetingID: meetingID,
        };
        
        if (record.record_id && record.url) {
          await addRecord(record);
          console.log('Record added to database successfully:', record);
        } else {
          console.warn(`No valid URL found for record ID: ${record.record_id}`);
        }
      }
      
      setRecordingData(fetchedData);
      
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      setError('Failed to process recordings. Please try again.');
    } finally {
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

      {isLoading && (
        <div className="text-center text-gray-500">
          Fetching and processing recordings...
        </div>
      )}

      {error && (
        <div className="text-center text-red-500">
          {error}
        </div>
      )}

      {/* This will loop through the array and display a card for each recording */}
      {Array.isArray(recordingData) && recordingData.length > 0 && (
        <div className="space-y-4">
          {recordingData.map((recording, index) => (
            <div key={index} className="p-4 bg-gray-100 rounded-lg space-y-2">
              <p className="font-semibold text-gray-700">Record ID:</p>
              <p className="text-sm break-all text-gray-600">{recording.recordID}</p>
              {recording.podcastUrl && (
                <>
                  <p className="font-semibold text-gray-700">Podcast URL:</p>
                  <a href={recording.podcastUrl} target="_blank" rel="noopener noreferrer" className="block text-sm break-all text-blue-500 hover:underline">
                    {recording.podcastUrl}
                  </a>
                </>
              )}
              {recording.presentationUrl && (
                <>
                  <p className="font-semibold text-gray-700">Presentation URL:</p>
                  <a href={recording.presentationUrl} target="_blank" rel="noopener noreferrer" className="block text-sm break-all text-blue-500 hover:underline">
                    {recording.presentationUrl}
                  </a>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {/* This will display the 'No recordings found' message. */}
      {typeof recordingData === 'object' && recordingData.message && !isLoading && (
        <div className="text-center text-gray-500">
          {recordingData.message}
        </div>
      )}
    </form>
  );
}
