import CabBookingForm from "@/components/CabBookingForm";

export default function BookCabPage() {
  return (
    <main className="flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4 text-green-600 text-center">
        Book Your Cab
      </h1>
      <p className="mb-6 text-gray-700 max-w-md text-center">
        Enter pickup and drop locations (Google Maps links) to see the distance and fare.
      </p>
      <CabBookingForm />
    </main>
  );
}
