"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-gray-200">500</h1>
      <h2 className="mt-4 text-xl font-semibold text-gray-900">
        Something went wrong
      </h2>
      <p className="mt-2 text-gray-500">
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={reset}
        className="mt-6 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        Try Again
      </button>
    </div>
  );
}
