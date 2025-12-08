import React from "react";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-50 text-center px-4">
      <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
      <p className="text-gray-500 mb-6 max-w-md">
        The page you’re looking for doesn’t exist or may have been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
      >
        Go Home
      </Link>
    </div>
  );
}
