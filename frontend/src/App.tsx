import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [number, setNumber] = useState('');
  const [result, setResult] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/numbers/${number}`);
      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert('Failed to fetch number details');
    }
  };

  return (
    <div>
      <h1>Phone Lookup</h1>
      <input
        type="tel"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        placeholder="Enter phone number"
      />
      <button onClick={handleSearch}>Search</button>
      {result && (
        <div>
          <p>Carrier: {result.carrier}</p>
          <p>Location: {result.location}</p>
        </div>
      )}
    </div>
  );
}

export default App;