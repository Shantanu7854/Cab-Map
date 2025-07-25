import React, { useState } from 'react';
import axios from 'axios';

const App: React.FC = () => {
  const [pickupUrl, setPickupUrl] = useState('');
  const [dropUrl, setDropUrl] = useState('');
  const [pickupAddress, setPickupAddress] = useState('');
  const [dropAddress, setDropAddress] = useState('');
  const [pickupCoords, setPickupCoords] = useState<{ lat: string, lng: string } | null>(null);
  const [dropCoords, setDropCoords] = useState<{ lat: string, lng: string } | null>(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [error, setError] = useState('');

  const extractLocation = async (url: string) => {
    try {
      const detailedRes = await axios.post('http://localhost:5000/get-detailed-address', { url });
      const simpleRes = await axios.post('http://localhost:5000/get-simple-address', { url });
      return {
        address: simpleRes.data.address || 'N/A',
        lat: detailedRes.data.lat,
        lng: detailedRes.data.lng,
      };
    } catch (err) {
      throw new Error('Failed to extract location from URL.');
    }
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage('');
    setError('');
    try {
      const pickup = await extractLocation(pickupUrl);
      const drop = await extractLocation(dropUrl);

      setPickupAddress(pickup.address);
      setDropAddress(drop.address);
      setPickupCoords({ lat: pickup.lat, lng: pickup.lng });
      setDropCoords({ lat: drop.lat, lng: drop.lng });

      setStatusMessage('Cab successfully booked from Pickup to Drop!');
    } catch (err) {
      setError('Booking failed. Please ensure both URLs are correct.');
      setPickupAddress('');
      setDropAddress('');
      setPickupCoords(null);
      setDropCoords(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 flex justify-center items-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-xl w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">🚖 Book Your Cab</h1>

        <form onSubmit={handleBooking}>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Pickup Location (Google Maps URL)</label>
            <input
              type="text"
              value={pickupUrl}
              onChange={(e) => setPickupUrl(e.target.value)}
              placeholder="Enter Pickup Google Maps URL"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block font-semibold mb-1">Drop Location (Google Maps URL)</label>
            <input
              type="text"
              value={dropUrl}
              onChange={(e) => setDropUrl(e.target.value)}
              placeholder="Enter Drop Google Maps URL"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-300"
          >
            Book Cab
          </button>
        </form>

        {statusMessage && (
          <div className="mt-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            <p>{statusMessage}</p>
            <p><strong>From:</strong> {pickupAddress}</p>
            <p><strong>To:</strong> {dropAddress}</p>
            {pickupCoords && <p><strong>Pickup Coords:</strong> {pickupCoords.lat}, {pickupCoords.lng}</p>}
            {dropCoords && <p><strong>Drop Coords:</strong> {dropCoords.lat}, {dropCoords.lng}</p>}
          </div>
        )}

        {error && (
          <div className="mt-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
