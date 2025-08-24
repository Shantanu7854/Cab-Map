import MapForm from "@/components/MapForm";

export default function ResolvePage() {
  return (
    <main className="flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4 text-blue-600 text-center">
        Resolve Google Maps Link
      </h1>
      <p className="mb-6 text-gray-700 max-w-md text-center">
        Paste a Google Maps link below to get the exact address and coordinates.
      </p>
      <MapForm />
    </main>
  );
}
