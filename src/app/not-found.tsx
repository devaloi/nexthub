import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-gray-200">404</h1>
      <h2 className="mt-4 text-xl font-semibold text-gray-900">
        Page Not Found
      </h2>
      <p className="mt-2 text-gray-500">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        Go Home
      </Link>
    </div>
  );
}
