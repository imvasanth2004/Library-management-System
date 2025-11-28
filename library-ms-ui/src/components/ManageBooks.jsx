import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Navbar from "./Navbar";
import logo from "../assets/book2.jpg";
import { Link } from "react-router-dom";

const ManageBooks = () => {
  const { token } = useSelector((state) => state.auth);
  const [books, setBooks] = useState([]);
  const [isAddFormVisible, setAddFormVisible] = useState(false);
  const [editBook, setEditBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newBook, setNewBook] = useState({
    bookId: "",
    title: "",
    author: "",
    status: "Available",
    publishedYear: "",
    quantity: "",
  });

  // Fetch books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/books/getBooks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, [token]);

  
  const handleAddBook = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/books/create",
        newBook,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBooks((prevBooks) => [...prevBooks, response.data]);
      setNewBook({
        bookId: "",
        title: "",
        author: "",
        status: "Available",
        publishedYear: "",
        quantity: "",
      });
      setAddFormVisible(false);
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

 
  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "Available" ? "borrowed" : "Available";
      await axios.patch(
        `http://localhost:8080/books/${id}/status`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { status: newStatus },
        }
      );
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === id ? { ...book, status: newStatus } : book
        )
      );
    } catch (error) {
      console.error("Error updating book status:", error);
    }
  };

  
 
  const handleEditBook = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/books/update/${editBook.id}`,
        editBook,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === editBook.id ? response.data : book
        )
      );
      setEditBook(null);
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  
  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  
  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery) ||
      book.author.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="p-6 bg-gray-100">
      <Navbar />
        
      <Link to="/bookhistory" className="flex justify-end">
        <span className="text-lg underline text-blue-600 hover:text-blue-800">
          Books History
        </span>
      </Link>

      <h1 className="text-2xl font-bold mb-4">Manage Books</h1>
      <div className="flex justify-center items-center flex-col mb-6">
     <div className="w-full max-w-md">
     <input
      type="text"
      placeholder="Search by title or author"
      value={searchQuery}
      onChange={handleSearch}
      className="w-full  p-4 mt-4 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>
  </div>
      <button
        onClick={() => setAddFormVisible(!isAddFormVisible)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        {isAddFormVisible ? "Close Add Book Form" : "Add Book"}
      </button>
      {isAddFormVisible && (
        <div className="bg-gray-100 p-4 rounded mb-6">
          <h2 className="text-xl font-semibold mb-4">Add New Book</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Book ID"
              value={newBook.bookId}
              onChange={(e) => setNewBook({ ...newBook, bookId: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Title"
              value={newBook.title}
              onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Author"
              value={newBook.author}
              onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
              className="border p-2 rounded"
            />
            <select
              value={newBook.status}
              onChange={(e) => setNewBook({ ...newBook, status: e.target.value })}
              className="border p-2 rounded"
            >
              <option value="Available">Available</option>
              <option value="borrowed">borrowed</option>
            </select>
            <input
              type="number"
              placeholder="Published Year"
              value={newBook.publishedYear}
              onChange={(e) =>
                setNewBook({ ...newBook, publishedYear: e.target.value })
              }
              className="border p-2 rounded"
            />
            <input
              type="number"
              placeholder="Quantity"
              value={newBook.quantity}
              onChange={(e) => setNewBook({ ...newBook, quantity: e.target.value })}
              className="border p-2 rounded"
            />
          </div>
          <button
            onClick={handleAddBook}
            className="bg-green-500 text-white px-4 py-2 rounded mt-4"
          >
            Add Book
          </button>
        </div>
      )}
      {editBook && (
        <div className="bg-gray-100 p-4 rounded mt-6">
          <h2 className="text-xl font-semibold mb-4">Edit Book</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              value={editBook.bookId}
              onChange={(e) =>
                setEditBook({ ...editBook, bookId: e.target.value })
              }
              className="border p-2 rounded"
            />
            <input
              type="text"
              value={editBook.title}
              onChange={(e) =>
                setEditBook({ ...editBook, title: e.target.value })
              }
              className="border p-2 rounded"
            />
            <input
              type="text"
              value={editBook.author}
              onChange={(e) =>
                setEditBook({ ...editBook, author: e.target.value })
              }
              className="border p-2 rounded"
            />
            <select
              value={editBook.status}
              onChange={(e) =>
                setEditBook({ ...editBook, status: e.target.value })
              }
              className="border p-2 rounded"
            >
              <option value="Available">Available</option>
              <option value="Borrowed">Borrowed</option>
            </select>
            <input
              type="number"
              value={editBook.publishedYear}
              onChange={(e) =>
                setEditBook({ ...editBook, publishedYear: e.target.value })
              }
              className="border p-2 rounded"
            />
            <input
              type="number"
              value={editBook.quantity}
              onChange={(e) =>
                setEditBook({ ...editBook, quantity: e.target.value })
              }
              className="border p-2 rounded"
            />
          </div>
          <button
            onClick={handleEditBook}
            className="bg-green-500 text-white px-4 py-2 rounded mt-4"
          >
            Save Changes
          </button>
          <button
            onClick={() => setEditBook(null)}
            className="bg-gray-500 text-white px-4 py-2 rounded mt-4 ml-2"
          >
            Cancel
          </button>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-300">
              <th className="border px-4 py-2">Book ID</th>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Author</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Published Year</th>
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book) => (
              <tr key={book.id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{book.bookId}</td>
                <td className="border px-4 py-2">{book.title}</td>
                <td className="border px-4 py-2">{book.author}</td>
                <td className="border px-4 py-2">{book.status}</td>
                <td className="border px-4 py-2">{book.publishedYear}</td>
                <td className="border px-4 py-2">{book.quantity}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => setEditBook(book)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                 onClick={() => handleToggleStatus(book.id, book.status)}
                  className={`${
                    book.status === "Available" ? "bg-green-500" : "bg-orange-500"
                   } text-white px-2 py-1 rounded mr-2`}
                  >
             {book.status === "Available" ? "Mark as Borrowed" : "Mark as Available"}
                   </button>

                  <button
                    onClick={() => handleDeleteBook(book.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBooks;
