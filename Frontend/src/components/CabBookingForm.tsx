"use client";

import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { calculateDistanceKm, calculatePrice } from "@/lib/cab";
import BookingResult from "./BookingResult";
import toast from "react-hot-toast";
import { resolveMapLink } from "@/lib/api";

const CabBookingForm = () => {
  const [pickupUrl, setPickupUrl] = useState("");
  const [dropUrl, setDropUrl] = useState("");
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const pickup = await resolveMapLink(pickupUrl);
      const drop = await resolveMapLink(dropUrl);

      if (pickup.error || drop.error) {
        const errorMsg = pickup.error || drop.error;
        toast.error(errorMsg);
        setBooking({ error: errorMsg });
      } else {
        const distance = calculateDistanceKm(
          parseFloat(pickup.latitude),
          parseFloat(pickup.longitude),
          parseFloat(drop.latitude),
          parseFloat(drop.longitude)
        );
        const price = calculatePrice(distance);
        setBooking({ pickup, drop, distance, price });
        toast.success("Cab details calculated successfully!");
      }
    } catch {
      toast.error("Failed to book cab.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-lg w-full mx-auto p-6 bg-white rounded-xl shadow-lg">
      <form className="flex flex-col gap-4" onSubmit={handleBooking}>
        <Input
          placeholder="Pickup Google Maps link"
          value={pickupUrl}
          onChange={(e) => setPickupUrl(e.target.value)}
          required
        />
        <Input
          placeholder="Drop Google Maps link"
          value={dropUrl}
          onChange={(e) => setDropUrl(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              Calculating...
            </span>
          ) : (
            "Book Cab"
          )}
        </Button>
      </form>

      {booking && <BookingResult data={booking} />}
    </div>
  );
};

export default CabBookingForm;
