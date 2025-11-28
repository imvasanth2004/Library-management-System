// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { borrowBook } from "../redux/booksSlice";
// import Navbar from "../Navbar";

// const BorrowHistory = () => {
//   const dispatch = useDispatch();
//   const token = useSelector((state) => state.auth.token);
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
//   const [borrowedBooks, setBorrowedBooks] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const books = useSelector((state) => state.books.books);
//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     const fetchBorrowedBooks = async () => {
//       if (isAuthenticated && token) {
//         try {
//           const response = await axios.get(`http://localhost:8080/books/history`, {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           setBorrowedBooks(response.data);

//           // Optionally dispatch data to Redux
//           response.data.forEach((book) => {
//             dispatch(borrowBook({ bookId: book.id, title: book.bookTitle, borrowedDate: book.borrowedDate }));
//           });
//         } catch (error) {
//           console.error("Error fetching borrowed books:", error);
//         } finally {
//           setIsLoading(false);
//         }
//       }
//     };

//     fetchBorrowedBooks();
//   }, [token, isAuthenticated, dispatch]);

//   if (isLoading) {
//     return <p>Loading...</p>;
//   }

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const filteredBooks = borrowedBooks.filter((book) => {
//     const searchText = searchQuery.toLowerCase();
//     const isNotReturned = book.returnedDate === null || book.returnedDate === "";
    
//     return (
//       book.bookTitle.toLowerCase().includes(searchText) ||
//       book.bookAuthor.toLowerCase().includes(searchText) ||
//       (isNotReturned && "Not returned yet".toLowerCase().includes(searchText))
//     );
//   });

//   return (
//     <div className="p-4 bg-gray-100 min-h-screen">
//       <Navbar />
//       <h2 className="text-2xl font-bold mb-4">Borrow History</h2>
//       <div className="flex justify-center items-center flex-col mb-6">
//         <div className="w-full max-w-md">
//           <input
//             type="text"
//             placeholder="Search by title, author or 'Not returned yet'"
//             value={searchQuery}
//             onChange={handleSearch}
//             className="w-full p-4 mt-4 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//         </div>
//       </div>

//       {borrowedBooks.length > 0 ? (
//         <div className="overflow-x-auto">
//           <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
//             <thead>
//               <tr className="border-b bg-gray-100">
//                 <th className="px-4 py-2 text-left font-semibold text-gray-800">#</th> {/* Added numbering column */}
//                 <th className="px-4 py-2 text-left font-semibold text-gray-800">Book Title</th>
//                 <th className="px-4 py-2 text-left font-semibold text-gray-800">Author</th>
//                 <th className="px-4 py-2 text-left font-semibold text-gray-800">Student Name</th>
//                 <th className="px-4 py-2 text-left font-semibold text-gray-800">Enrollment No</th>
//                 <th className="px-4 py-2 text-left font-semibold text-gray-800">Borrowed Date</th>
//                 <th className="px-4 py-2 text-left font-semibold text-gray-800">Returned Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredBooks.map((book, index) => (
//                 <tr key={book.id} className="border-b hover:bg-gray-50">
//                   <td className="px-4 py-2">{index + 1}</td> {/* Display index + 1 for numbering */}
//                   <td className="px-4 py-2">{book.bookTitle}</td>
//                   <td className="px-4 py-2">{book.bookAuthor}</td>
//                   <td className="px-4 py-2">{book.studentFullName}</td>
//                   <td className="px-4 py-2">{book.studentEnrollNo}</td>
//                   <td className="px-4 py-2">{new Date(book.borrowedDate).toLocaleDateString()}</td>
//                   <td className="px-4 py-2">
//                     {book.returnedDate ? new Date(book.returnedDate).toLocaleDateString() : "Not returned yet"}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <p className="text-gray-500">You haven't borrowed any books yet.</p>
//       )}
//     </div>
//   );
// };

// export default BorrowHistory;





import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { borrowBook } from "../redux/booksSlice";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";

const BorrowHistory = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const books = useSelector((state) => state.books.books);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate =useNavigate();
 const [redirecting, setRedirecting] = useState(false);
  useEffect(() => {
      if (!isAuthenticated) {
        setRedirecting(true);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    }, [isAuthenticated, navigate]);

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      if (isAuthenticated && token) {
        try {
          const response = await axios.get(`http://localhost:8080/books/history`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setBorrowedBooks(response.data);

          // Optionally dispatch data to Redux
          response.data.forEach((book) => {
            dispatch(borrowBook({ bookId: book.id, title: book.bookTitle, borrowedDate: book.borrowedDate }));
          });
        } catch (error) {
          console.error("Error fetching borrowed books:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchBorrowedBooks();
  }, [token, isAuthenticated, dispatch]);

  

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredBooks = borrowedBooks.filter((book) => {
    const searchText = searchQuery.toLowerCase();
    const isNotReturned = book.returnedDate === null || book.returnedDate === "";
    
    return (
      book.bookTitle.toLowerCase().includes(searchText) ||
      book.bookAuthor.toLowerCase().includes(searchText) ||
      (isNotReturned && "Not returned yet".toLowerCase().includes(searchText))
    );
  });

  if (redirecting) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-bold text-red-500">Please log in first...</p>
      </div>
    );
  }


  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <Navbar />
      <h2 className="text-2xl font-bold mb-4">Borrow History</h2>
      <div className="flex justify-center items-center flex-col mb-6">
        <div className="w-full max-w-md">
          <input
            type="text"
            placeholder="Search by title, author or 'Not returned yet'"
            value={searchQuery}
            onChange={handleSearch}
            className="w-full p-4 mt-4 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {borrowedBooks.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
            <thead>
              <tr className="border-b bg-blue-500">
                <th className="px-4 py-2 text-left font-semibold text-gray-800 " >#</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-800">Book Title</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-800">Author</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-800">Student Name</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-800">Enrollment No</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-800">Borrowed Date</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-800">Returned Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book, index) => (
                <tr key={book.id} className={`border-b hover:bg-gray-50 ${book.returnedDate === null || book.returnedDate === "" ? "bg-red-100 text-red-700" : ""}`}>
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{book.bookTitle}</td>
                  <td className="px-4 py-2">{book.bookAuthor}</td>
                  <td className="px-4 py-2">{book.studentFullName}</td>
                  <td className="px-4 py-2">{book.studentEnrollNo}</td>
                  <td className="px-4 py-2">{new Date(book.borrowedDate).toLocaleDateString()}</td>
                  <td className="px-4 py-2">
                    {book.returnedDate ? new Date(book.returnedDate).toLocaleDateString() : "Not returned yet"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">You haven't borrowed any books yet.</p>
      )}
    </div>
  );
};

export default BorrowHistory;
