import React, { useState } from 'react';
import book1 from '../assets/Don Quixote.jpeg';
import book2 from '../assets/Alice2.jpeg';
import book3 from '../assets/The Adventures.jpeg';
import book4 from '../assets/The Adventures.jpeg';
import book5 from '../assets/Don Quixote.jpeg';
import book6 from '../assets/Alice2.jpeg';
import book7 from '../assets/Don Quixote.jpeg';
import book8 from '../assets/Alice2.jpeg';
import book9 from '../assets/The Adventures.jpeg';
import book10 from '../assets/The Adventures.jpeg';
import book11 from '../assets/Don Quixote.jpeg';
import book12 from '../assets/Alice2.jpeg';

const BookCarousel = () => {
  const allBooks = [
    { img: book1, title: 'The Great Gatsby', description: 'A classic tale of the American dream.' },
    { img: book2, title: "Alice's Adventures in Wonderland", description: 'A whimsical world filled with peculiar creatures.' },
    { img: book3, title: 'The Adventures of Huckleberry Finn', description: 'A journey down the Mississippi River.' },
    { img: book4, title: 'Moby-Dick', description: 'Captain Ahab’s obsession with the white whale.' },
    { img: book5, title: '1984', description: 'A dystopian novel by George Orwell.' },
    { img: book6, title: 'War and Peace', description: 'A historical novel by Leo Tolstoy.' },
    { img: book7, title: 'The Great Gatsby', description: 'A classic tale of the American dream.' },
    { img: book8, title: "Alice's Adventures in Wonderland", description: 'A whimsical world filled with peculiar creatures.' },
    { img: book9, title: 'The Adventures of Huckleberry Finn', description: 'A journey down the Mississippi River.' },
    { img: book10, title: 'Moby-Dick', description: 'Captain Ahab’s obsession with the white whale.' },
    { img: book11, title: '1984', description: 'A dystopian novel by George Orwell.' },
    { img: book12, title: 'War and Peace', description: 'A historical novel by Leo Tolstoy.' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextBooks = () => {
    if (currentIndex + 4 < allBooks.length) {
      setCurrentIndex(currentIndex + 4);
    }
  };

  const prevBooks = () => {
    if (currentIndex - 4 >= 0) {
      setCurrentIndex(currentIndex - 4);
    }
  };

  const currentBooks = allBooks.slice(currentIndex, currentIndex + 4);

  return (
    <section className="bg-gray-50 py-12 px-10 ml-20">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Explore Our Books Collection</h2>

      <div className="relative flex items-center">
        {/* Left Arrow */}
        <button
          className="absolute left-[-60px] top-1/2 transform -translate-y-1/2 text-4xl text-gray-700 hover:text-gray-900 transition duration-300 z-10 bg-white p-2 rounded-full shadow-md hover:shadow-lg"
          onClick={prevBooks}
        >
          &lt;
        </button>

        <div className="flex gap-8">
          {currentBooks.map((book, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105"
              style={{ width: '250px' }} // Set a fixed width to keep image sizes consistent
            >
              <img
                src={book.img}
                alt={book.title}
                className="w-full h-[270px] object-cover rounded-t-lg"
              />
              <h3 className="mt-4 text-xl font-semibold text-gray-800">{book.title}</h3>
              <p className="text-gray-600 mt-2">{book.description}</p>
              <button
                className="mt-4 bg-gradient-to-r from-teal-500 to-green-400 text-white py-2 px-4 rounded-full hover:bg-blue-400 transition duration-300"
                onClick={() => window.open(`https://www.google.com/search?q=${book.title}`)}
              >
                Read More
              </button>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          className="absolute right-[40px] top-1/2 transform -translate-y-1/2 text-4xl text-gray-700 hover:text-gray-900 transition duration-300 z-10 bg-white p-2 rounded-full shadow-md hover:shadow-lg"
          onClick={nextBooks}
        >
          &gt;
        </button>
      </div>
    </section>
  );
};

export default BookCarousel;
