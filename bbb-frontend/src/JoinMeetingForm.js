// src/JoinMeetingForm.js
// import React, { useState } from 'react';

// function JoinMeetingForm() {
//   const [meetingID, setMeetingID] = useState('');
//   const [fullName, setFullName] = useState('');
//   const [attendeePW, setAttendeePW] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!meetingID.trim() || !fullName.trim()) {
//       alert('Please enter Meeting ID and Full Name.');
//       return;
//     }

//     setLoading(true);

//     try {
//       // Build query params client-side; backend expects GET query params
//       const params = new URLSearchParams({
//         meetingID: meetingID.trim(),
//         fullName: fullName.trim(),
//         attendeePW: attendeePW.trim()
//       });

//       const response = await fetch(`http://localhost:5000/api/bbb/join?${params.toString()}`, {
//         method: 'GET'
//       });

//       if (!response.ok) {
//         const text = await response.text();
//         throw new Error(`Server error (${response.status}): ${text}`);
//       }

//       const data = await response.json();

//       if (!data.url) {
//         throw new Error('No URL returned from server');
//       }

//       // Redirect the browser to the BBB join URL (replaces current page)
//       window.location.href = data.url;
//       // If you prefer new tab: window.open(data.url, '_blank');
//     } catch (err) {
//       console.error('Failed to generate join URL:', err);
//       alert('Failed to generate join URL. See console for details.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ maxWidth: 520, margin: '20px auto', padding: 16 }}>
//       <h3>Join Meeting</h3>
//       <form onSubmit={handleSubmit}>
//         <div style={{ marginBottom: 10 }}>
//           <label>Meeting ID</label><br />
//           <input
//             value={meetingID}
//             onChange={(e) => setMeetingID(e.target.value)}
//             placeholder="e.g. ali-123"
//             style={{ width: '100%', padding: 8 }}
//           />
//         </div>

//         <div style={{ marginBottom: 10 }}>
//           <label>Full Name</label><br />
//           <input
//             value={fullName}
//             onChange={(e) => setFullName(e.target.value)}
//             placeholder="Your full name"
//             style={{ width: '100%', padding: 8 }}
//           />
//         </div>

//         <div style={{ marginBottom: 10 }}>
//           <label>Attendee Password</label><br />
//           <input
//             value={attendeePW}
//             onChange={(e) => setAttendeePW(e.target.value)}
//             placeholder="attendee password (if required)"
//             style={{ width: '100%', padding: 8 }}
//           />
//         </div>

//         <button type="submit" disabled={loading} style={{ padding: '8px 14px' }}>
//           {loading ? 'Generating...' : 'Generate Join URL & Redirect'}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default JoinMeetingForm;
