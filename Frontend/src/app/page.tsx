import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center mt-20 px-6">
      <h1 className="text-4xl sm:text-5xl font-bold text-blue-600 mb-4">
        Welcome to CabMap 🚖
      </h1>
      <p className="text-gray-600 text-lg sm:text-xl max-w-md mx-auto text-center mb-8">
        Quickly resolve Google Maps links and book cabs with exact fare and distance.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/resolve"
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:from-blue-600 hover:to-blue-800 transition"
        >
          Resolve Address
        </Link>
        <Link
          href="/book"
          className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold rounded-xl shadow-lg hover:from-green-600 hover:to-green-800 transition"
        >
          Book Cab
        </Link>
      </div>
    </div>
  );
}
