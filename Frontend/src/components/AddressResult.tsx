import { MapPin } from "lucide-react";

interface AddressResultProps {
  data: any;
}

const AddressResult = ({ data }: AddressResultProps) => {
  if (data.error)
    return (
      <p className="mt-4 text-red-500 font-medium text-center">{data.error}</p>
    );

  return (
    <div className="mt-6 p-6 bg-white rounded-2xl shadow-xl border border-gray-200 max-w-lg w-full mx-auto">
      <h2 className="text-2xl font-bold text-blue-600 mb-4 flex items-center gap-2">
        <MapPin className="h-6 w-6" /> Resolved Address
      </h2>
      <div className="space-y-2 text-gray-700">
        <p>
          <span className="font-semibold">Address:</span> {data.address}
        </p>
        <p>
          <span className="font-semibold">Latitude:</span> {data.latitude}
        </p>
        <p>
          <span className="font-semibold">Longitude:</span> {data.longitude}
        </p>
        <p>
          <span className="font-semibold">Original URL:</span>{" "}
          <a
            href={data.short_url}
            className="text-blue-500 underline"
            target="_blank"
          >
            {data.short_url}
          </a>
        </p>
        <p>
          <span className="font-semibold">Expanded URL:</span>{" "}
          <a
            href={data.long_url}
            className="text-blue-500 underline"
            target="_blank"
          >
            {data.long_url}
          </a>
        </p>
      </div>
    </div>
  );
};

export default AddressResult;
