

// import React, { useState } from 'react';
// // We'll still import addRecord, but we'll create a mock for it.
// import { getRecordings, addRecord } from '../api/bbb';

// // The state will now be an array, so we can store multiple recordings.
// const initialRecordingData = [];


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
//       const response = await getRecordings({ meetingID });
//       const fetchedData = response.data;

//       // await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate 1.5s network delay
//       // const fetchedData = mockResponse.data;
      
//       // Step 2: Check if the response is an object with a 'message' property.
//       // This is the key change to handle the "No recordings found" case.
//       if (typeof fetchedData === 'object' && fetchedData !== null && fetchedData.hasOwnProperty('message')) {
//         setRecordingData(fetchedData);
//         return;
//       }
      
//       // Step 3: If a recording was found, process the rest.
//       // Now we can safely loop over the data, as we know it's an array.
//       for (const recording of fetchedData) {
//         // ... The rest of your processing logic remains the same.
//         console.log('Recordings fetched successfully:', recording);
        
//         const recordUrl = recording.presentationUrl || recording.podcastUrl;
        
//         const record = {
//           record_id: recording.recordID,
//           url: recordUrl,
//           meetingID: meetingID,
//         };
        
//         if (record.record_id && record.url) {
//           await addRecord(record);
//           console.log('Record added to database successfully:', record);
//         } else {
//           console.warn(`No valid URL found for record ID: ${record.record_id}`);
//         }
//       }
      
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

//       {/* This will loop through the array and display a card for each recording */}
//       {Array.isArray(recordingData) && recordingData.length > 0 && (
//         <div className="space-y-4">
//           {recordingData.map((recording, index) => (
//             <div key={index} className="p-4 bg-gray-100 rounded-lg space-y-2">
//               <p className="font-semibold text-gray-700">Record ID:</p>
//               <p className="text-sm break-all text-gray-600">{recording.recordID}</p>
//               {recording.podcastUrl && (
//                 <>
//                   <p className="font-semibold text-gray-700">Podcast URL:</p>
//                   <a href={recording.podcastUrl} target="_blank" rel="noopener noreferrer" className="block text-sm break-all text-blue-500 hover:underline">
//                     {recording.podcastUrl}
//                   </a>
//                 </>
//               )}
//               {recording.presentationUrl && (
//                 <>
//                   <p className="font-semibold text-gray-700">Presentation URL:</p>
//                   <a href={recording.presentationUrl} target="_blank" rel="noopener noreferrer" className="block text-sm break-all text-blue-500 hover:underline">
//                     {recording.presentationUrl}
//                   </a>
//                 </>
//               )}
//             </div>
//           ))}
//         </div>
//       )}

//       {/* This will display the 'No recordings found' message. */}
//       {typeof recordingData === 'object' && recordingData.message && !isLoading && (
//         <div className="text-center text-gray-500">
//           {recordingData.message}
//         </div>
//       )}
//     </form>
//   );
// }

// ... (imports and state initialization remain the same)


//}

import React, { useState } from 'react';
import { getRecordings, addRecord } from '../api/bbb';

const initialRecordingData = [];

export default function GetRecordingsForm() {
    const [meetingID, setMeetingID] = useState('');
    const [recordingData, setRecordingData] = useState(initialRecordingData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    // New state to track if a search has been performed.
    const [hasSearched, setHasSearched] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!meetingID) {
            console.error('Please enter a Meeting ID.');
            return;
        }

        setRecordingData(initialRecordingData);
        setError(null);
        setIsLoading(true);
        setHasSearched(false); // Reset this flag at the start of a new search.

        try {
            const response = await getRecordings({ meetingID });
            const fetchedData = response.data;
            
            // Set the state with the fetched array.
            setRecordingData(fetchedData);
            setHasSearched(true); // Set the flag to true after the search is complete.
            
            // Your loop to add records to the database
            if (Array.isArray(fetchedData) && fetchedData.length > 0) {
                for (const recording of fetchedData) {
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
            }

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

            {/* Display recordings if the array is not empty */}
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

            {/* Display 'No recordings found' message only when a search has been performed */}
            {hasSearched && recordingData.length === 0 && !isLoading && !error && (
                <div className="text-center text-gray-500">
                    No recordings found for this meeting ID.
                </div>
            )}
        </form>
    );
}
