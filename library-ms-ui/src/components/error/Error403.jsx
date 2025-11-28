import React from 'react';

const Error403 = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="text-center p-8 bg-white  rounded-lg">
      <h1 className="text-6xl font-bold text-red-600 mb-4">403</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Forbidden</h2>
      <p className="text-gray-600 mb-6">
        You do not have permission to view this page.
      </p>
      <a
        href="/"
        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition duration-300"
      >
        Go Back to Home
      </a>
    </div>
  </div>
);

export default Error403;
