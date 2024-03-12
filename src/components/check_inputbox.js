import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'; // Import Firestore if you're using Firestore


function Checkinputbox() {
  const [checkNumbers, setCheckNumbers] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const db = firebase.firestore(); // Get Firestore instance
      const docRef = db.collection('checks').doc(); // Reference to a new document in 'checks' collection

      // Set document data
      await docRef.set({
        inv_id: checkNumbers,
        timestamp: firebase.firestore.FieldValue.serverTimestamp() // Add a timestamp
      });

      setMessage('Check submitted successfully!');
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred while processing your request.');
    }
  };

  return (
    <div>
      <h2 id='check-topic'>Insert Check Received</h2>
      <form onSubmit={handleSubmit}>
        <div className='checkInsertForm'>
        <label id='checkCont' htmlFor="inv_id">Check Numbers (comma-separated):</label><br />
        <input
          type="text"
          id="inv_id"
          name="inv_id"
          value={checkNumbers}
          onChange={(e) => setCheckNumbers(e.target.value)}
        /><br /><br />
        </div>
        <input id='checkinsertbut' type="submit" value="Submit" />
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Checkinputbox;
