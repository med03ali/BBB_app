import React, { useState } from 'react';
import { getRecordings, addRecord, deleteRecording, deleteRecordFromDB } from '../api/bbb';

const initialRecordingData = [];

export default function GetRecordingsForm({user}) {
  const [meetingID, setMeetingID] = useState('');
  const [recordingData, setRecordingData] = useState(initialRecordingData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [copiedUrlIndex, setCopiedUrlIndex] = useState(null);
  const [copiedIdIndex, setCopiedIdIndex] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!meetingID) {
      console.error('Please enter a Meeting ID.');
      return;
    }

    setRecordingData(initialRecordingData);
    setError(null);
    setIsLoading(true);
    setHasSearched(false);

    try {
      const response = await getRecordings({ meetingID });
      const fetchedData = response.data;
      
      setRecordingData(fetchedData);
      setHasSearched(true);
      
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

  const copyUrlToClipboard = (url, index) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopiedUrlIndex(index);
      setTimeout(() => setCopiedUrlIndex(null), 2000);
    });
  };

  const copyIdToClipboard = (id, index) => {
    navigator.clipboard.writeText(id).then(() => {
      setCopiedIdIndex(index);
      setTimeout(() => setCopiedIdIndex(null), 2000);
    });
  };

  const handleDelete = async (recordId) => {
    setError(null); 
    console.log('Deleting record with ID:', recordId);
    try {
      await deleteRecording(recordId);
      await deleteRecordFromDB(recordId);
      console.log(`Record with ID ${recordId} deleted successfully`);
      
      setRecordingData(prevData => prevData.filter(record => record.recordID !== recordId));
    } catch (error) {
      console.error('Error in handleDelete', error);
      setError('Failed to delete recording');
    }
  };

  const isInstructor = user?.role === 'instructor';

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-gray-800 rounded-xl shadow-2xl space-y-4">
      <h2 className="text-2xl font-bold text-center text-gray-100">Get Recordings</h2>
      <input
        type="text"
        placeholder="Meeting ID"
        value={meetingID}
        onChange={(e) => setMeetingID(e.target.value)}
        className="block w-full px-4 py-2 text-center text-gray-700 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white placeholder-gray-400"
      />
      <button 
        type="submit" 
        className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Get Recordings'}
      </button>

      {isLoading && (
        <div className="text-center text-gray-400">
          Fetching and processing recordings...
        </div>
      )}

      {error && (
        <div className="text-center text-red-400">
          {error}
        </div>
      )}

      {Array.isArray(recordingData) && recordingData.length > 0 && (
        <div className="overflow-x-auto w-full">
          <table className="min-w-full bg-gray-700 rounded-lg overflow-hidden">
            <thead className="bg-gray-600">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-200 uppercase tracking-wider">Record ID</th>
                <th className="py-3 px-4 text-center text-xs font-semibold text-gray-200 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-600">
              {recordingData.map((recording, index) => {
                const url = recording.presentationUrl || recording.podcastUrl;
                return (
                  <tr key={index} className="hover:bg-gray-600 transition-colors duration-200">
                    <td className="py-4 px-4 text-sm font-medium text-gray-200 truncate" title={recording.recordID}>
                      {recording.recordID}
                    </td>
                    <td className="py-4 px-4 text-sm text-center">
                      <div className="flex justify-center space-x-2 items-center">
                        <button
                          type="button"
                          onClick={() => copyIdToClipboard(recording.recordID, index)}
                          className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded-lg text-xs transition-colors"
                        >
                          Copy ID
                        </button>
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded-lg text-xs transition-colors"
                        >
                          Watch
                        </a>
                        <button
                          type="button"
                          onClick={() => copyUrlToClipboard(url, index)}
                          className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded-lg text-xs transition-colors"
                        >
                          Copy URL
                        </button>
                        {isInstructor && (
                          <button
                            type="button"
                            onClick={() => handleDelete(recording.recordID)}
                            className="inline-block bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-lg text-xs transition-colors"
                          >
                            Delete
                          </button>
                        )}
                        {copiedIdIndex === index && (
                          <span className="text-green-400 text-xs">ID Copied!</span>
                        )}
                        {copiedUrlIndex === index && (
                          <span className="text-green-400 text-xs">URL Copied!</span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {hasSearched && recordingData.length === 0 && !isLoading && !error && (
        <div className="text-center text-gray-400 mt-4">
          No recordings found for this meeting ID.
        </div>
      )}
    </form>
  );
}