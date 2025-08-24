import { MapPin, Map, CreditCard } from "lucide-react";

interface BookingResultProps {
  data: any;
}

const BookingResult = ({ data }: BookingResultProps) => {
  if (data.error)
    return (
      <p className="mt-4 text-red-500 font-medium text-center">{data.error}</p>
    );

  return (
    <div className="mt-6 p-6 bg-white rounded-2xl shadow-xl border border-gray-200 max-w-lg w-full mx-auto">
      <h2 className="text-2xl font-bold text-green-600 mb-4 flex items-center gap-2">
        <Map className="h-6 w-6" /> Cab Booking Details
      </h2>
      <div className="space-y-3 text-gray-700">
        <p className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-blue-500" /> Pickup:{" "}
          <span className="font-medium">{data.pickup.address}</span>
        </p>
        <p className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-red-500" /> Drop:{" "}
          <span className="font-medium">{data.drop.address}</span>
        </p>
        <p className="flex items-center gap-2">
          <Map className="h-5 w-5 text-gray-600" /> Distance:{" "}
          <span className="font-medium">{data.distance.toFixed(2)} km</span>
        </p>
        <p className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-yellow-500" /> Estimated Price:{" "}
          <span className="font-medium">₹{data.price.toFixed(0)}</span>
        </p>
        <button className="mt-4 w-full py-3 bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold rounded-xl shadow-lg hover:from-green-600 hover:to-green-800 transition">
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default BookingResult;
