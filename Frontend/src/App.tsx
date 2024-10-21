import React, { useState } from 'react';
import axios from 'axios';

const App: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [latLng, setLatLng] = useState<{ lat: string, lng: string } | null>(null);
  const [error, setError] = useState<string>('');

  const handleSimpleAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/get-simple-address', { url });
      setAddress(response.data.address);
      setLatLng(null); // No lat/lng for simple address
      setError('');
    } catch (err) {
      setError('Failed to fetch the simple address. Please try again.');
      setAddress('');
      setLatLng(null);
    }
  };

  const handleDetailedAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/get-detailed-address', { url });
      setAddress(response.data.address);
      setLatLng({ lat: response.data.lat, lng: response.data.lng });
      setError('');
    } catch (err) {
      setError('Failed to fetch the detailed address. Please try again.');
      setAddress('');
      setLatLng(null);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-xl font-bold mb-4">Enter Google Maps Link</h1>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter Google Maps URL"
          className="w-full p-2 border rounded mb-4"
        />
        <div className="flex justify-between">
          <button onClick={handleSimpleAddress} className="w-1/2 bg-blue-500 text-white py-2 rounded mr-2">
            Get Simple Address
          </button>
          <button onClick={handleDetailedAddress} className="w-1/2 bg-green-500 text-white py-2 rounded">
            Get Detailed Address
          </button>
        </div>
        {address && (
          <p className="mt-4 text-green-600">
            Address: {address}
            {latLng && (
              <>
                <br />
                Latitude: {latLng.lat}, Longitude: {latLng.lng}
              </>
            )}
          </p>
        )}
        {error && <p className="mt-4 text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default App;
