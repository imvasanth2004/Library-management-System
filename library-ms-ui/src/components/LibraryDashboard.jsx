import React, { useState } from 'react';

const books = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', status: 'Available' },
  { id: 2, title: '1984', author: 'George Orwell', status: 'Borrowed' },
  { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', status: 'Available' },
  { id: 4, title: 'Moby Dick', author: 'Herman Melville', status: 'Reserved' },
  { id: 5, title: 'War and Peace', author: 'Leo Tolstoy', status: 'Available' },
  { id: 6, title: 'The Catcher in the Rye', author: 'J.D. Salinger', status: 'Borrowed' },
  // Add more books here
];

const LibraryDashboard = () => {
  const [search, setSearch] = useState('');

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-blue-600">Library Management</h1>
        <p className="text-gray-600 mt-2">Manage your library efficiently and beautifully.</p>
      </header>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">Total Books</h2>
          <p className="text-4xl font-bold mt-2">{books.length}</p>
        </div>
        <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">Available Books</h2>
          <p className="text-4xl font-bold mt-2">
            {books.filter((book) => book.status === 'Available').length}
          </p>
        </div>
        <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">Borrowed Books</h2>
          <p className="text-4xl font-bold mt-2">
            {books.filter((book) => book.status === 'Borrowed').length}
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search books by title..."
          className="w-full md:w-1/2 p-4 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out"
          >
            <h3 className="text-2xl font-semibold text-gray-800">{book.title}</h3>
            <p className="text-gray-600 mt-2">by {book.author}</p>
            <p
              className={`mt-4 inline-block px-3 py-1 rounded-full text-sm font-medium ${
                book.status === 'Available'
                  ? 'bg-green-100 text-green-600'
                  : book.status === 'Borrowed'
                  ? 'bg-yellow-100 text-yellow-600'
                  : 'bg-blue-100 text-blue-600'
              }`}
            >
              {book.status}
            </p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition duration-300"
              onClick={() => alert(`More details about "${book.title}"`)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* No Results Found */}
      {filteredBooks.length === 0 && (
        <p className="text-center text-gray-500 mt-12 text-lg">
          No books found matching your search.
        </p>
      )}
    </div>
  );
};

export default LibraryDashboard;
