// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import axios from "axios";
// import { returnBook } from "./redux/booksSlice";
// import Navbar from "./Navbar";
// import bookimg from "../assets/book1.jpg";
// import { jwtDecode } from "jwt-decode";
// import { useNavigate } from "react-router-dom";

// const UserHistory = () => {
//   const [borrowedBooks, setBorrowedBooks] = useState([]);
//   const { token, isAuthenticated } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate=useNavigate();

//   const [redirecting, setRedirecting] = useState(false);

//   useEffect(() => {
//     if (!isAuthenticated) {
//       setRedirecting(true); // Set the redirecting state to true
//       setTimeout(() => {
//         navigate("/login");
//       }, 2000); // Redirect to /login after 2 seconds
//     }
//   }, [isAuthenticated, navigate]);

//   if (redirecting) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <p className="text-lg font-bold text-red-500">Please log in first...</p>
//       </div>
//     );
//   }
//   if (!isAuthenticated) {
    
//     return null;
//   }

//   const getStudentUsername = () => {
//     try {
//       if (token) {
//         const decodedToken = jwtDecode(token);
//         return decodedToken?.sub || null;
//       }
//     } catch (error) {
//       console.error("Invalid token:", error.message);
//     }
//     return null;
//   };

//   useEffect(() => {
    
//     const fetchBorrowedBooks = async () => {
//       if (isAuthenticated && token) {
//         try {
//           const response = await axios.get(
//             "http://localhost:8080/books/borrowHistory",
//             {
//               headers: { Authorization: `Bearer ${token}` },
//             }
//           );
//           setBorrowedBooks(response.data);
//         } catch (error) {
//           console.error(
//             "Error fetching borrowed books:",
//             error.response?.data || error.message
//           );
//         }
//       }
//     };

//     fetchBorrowedBooks();
//   }, [token, isAuthenticated]);

//   const handleReturn = async (bookId) => {
//     if (window.confirm("Are you sure you want to return this book?")) {
//       try {
//         const response = await axios.patch(
//           `http://localhost:8080/books/${bookId}/return`,
//           {},
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         alert(response.data);
//         const studentUsername = getStudentUsername();
//         dispatch(returnBook({ bookId, username: studentUsername }));
//         setBorrowedBooks((prev) =>
//           prev.filter((borrow) => borrow.bookId !== bookId)
//         );
//       } catch (error) {
//         console.error(
//           "Error returning book:",
//           error.response?.data || error.message
//         );
//         alert(error.response?.data || "Failed to return the book.");
//       }
//     }
//   };

  

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <Navbar />
//       <h2 className="text-3xl font-bold text-center mb-8 text-teal-600">
//         Your Borrowed Books
//       </h2>
//       {borrowedBooks.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {borrowedBooks.map((borrow) => (
//             <div
//               key={borrow.id}
//               className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition duration-200"
//             >
//               <img
//                 src={bookimg}
//                 alt="Book Cover"
//                 className="w-60 h-40 object-cover rounded-md mb-4"
//               />
//               <h3 className="text-xl font-bold text-gray-800 mb-2">
//                 {borrow.title || "Unknown Title"}
//               </h3>
//               <p className="text-gray-600">
//                 <strong>Borrowed Date:</strong>{" "}
//                 {new Date(borrow.borrowDate).toLocaleDateString()}
//               </p>
//               <p className="text-gray-600">
//                 <strong>Return Date:</strong>{" "}
//                 {borrow.returnDate
//                   ? new Date(borrow.returnDate).toLocaleDateString()
//                   : "Not returned yet"}
//               </p>
//               <button
//                 onClick={() => borrow.book?.id && handleReturn(borrow.book.id)}
//                 className={`bg-red-500 text-white px-6 py-2 mt-2 rounded-lg text-lg font-medium hover:bg-red-600 transition duration-300 ease-in-out ${
//                   borrow.returnDate ? "bg-gray-500 cursor-not-allowed" : ""
//                 }`}
//                 disabled={!!borrow.returnDate} // Disable button if returnDate exists
//               >
//                 {borrow.returnDate ? "Already Returned" : "Return"}
//               </button>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-center text-gray-500">No borrowed books found.</p>
//       )}
//     </div>
//   );
// };

// export default UserHistory;



import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { returnBook } from "./redux/booksSlice";
import Navbar from "./Navbar";
import bookimg from "../assets/book1.jpg";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const UserHistory = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const { token, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
          const response = await axios.get(
            "http://localhost:8080/books/borrowHistory",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setBorrowedBooks(response.data);
        } catch (error) {
          console.error(
            "Error fetching borrowed books:",
            error.response?.data || error.message
          );
        }
      }
    };

    fetchBorrowedBooks();
  }, [token, isAuthenticated]);

  
  const getStudentUsername = () => {
    try {
      if (token) {
        const decodedToken = jwtDecode(token);
        return decodedToken?.sub || null;
      }
    } catch (error) {
      console.error("Invalid token:", error.message);
    }
    return null;
  };

  // Handle return of a book
  const handleReturn = async (bookId) => {
    if (window.confirm("Are you sure you want to return this book?")) {
      try {
        const response = await axios.patch(
          `http://localhost:8080/books/${bookId}/return`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert(response.data);
        const studentUsername = getStudentUsername();
        dispatch(returnBook({ bookId, username: studentUsername }));
        setBorrowedBooks((prev) =>
          prev.filter((borrow) => borrow.bookId !== bookId)
        );
      } catch (error) {
        console.error(
          "Error returning book:",
          error.response?.data || error.message
        );
        alert(error.response?.data || "Failed to return the book.");
      }
    }
  };

  // Handle redirecting UI
  if (redirecting) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-bold text-red-500">Please log in first...</p>
      </div>
    );
  }

  // Main UI for authenticated users
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Navbar />
      <h2 className="text-3xl font-bold text-center mb-8 text-teal-600">
        Your Borrowed Books
      </h2>
      {borrowedBooks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {borrowedBooks.map((borrow) => (
            <div
              key={borrow.id}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition duration-200"
            >
              <img
                src={bookimg}
                alt="Book Cover"
                className="w-60 h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {borrow.title || "Unknown Title"}
              </h3>
              <p className="text-gray-600">
                <strong>Borrowed Date:</strong>{" "}
                {new Date(borrow.borrowDate).toLocaleDateString()}
              </p>
              <p className="text-gray-600">
                <strong>Return Date:</strong>{" "}
                {borrow.returnDate
                  ? new Date(borrow.returnDate).toLocaleDateString()
                  : "Not returned yet"}
              </p>
              <button
                onClick={() => borrow.book?.id && handleReturn(borrow.book.id)}
                className={`bg-red-500 text-white px-6 py-2 mt-2 rounded-lg text-lg font-medium hover:bg-red-600 transition duration-300 ease-in-out ${
                  borrow.returnDate ? "bg-gray-500 cursor-not-allowed" : ""
                }`}
                disabled={!!borrow.returnDate} // Disable button if returnDate exists
              >
                {borrow.returnDate ? "Already Returned" : "Return"}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No borrowed books found.</p>
      )}
    </div>
  );
};

export default UserHistory;
