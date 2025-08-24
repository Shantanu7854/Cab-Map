"use client";

import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { resolveMapLink } from "@/lib/api";
import AddressResult from "./AddressResult";
import toast from "react-hot-toast";

const MapForm = () => {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await resolveMapLink(url);
      if (data.error) {
        toast.error(data.error);
        setResult(null);
      } else {
        toast.success("Address resolved successfully!");
        setResult(data);
      }
    } catch {
      toast.error("Something went wrong!");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-lg w-full mx-auto p-6 bg-white rounded-xl shadow-lg">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          placeholder="Enter Google Maps link"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
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
              Resolving...
            </span>
          ) : (
            "Resolve Address"
          )}
        </Button>
      </form>

      {result && <AddressResult data={result} />}
    </div>
  );
};

export default MapForm;
