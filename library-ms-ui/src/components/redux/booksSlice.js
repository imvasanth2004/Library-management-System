import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  books: [], // List of all books
  borrowedBooks: {}, // Tracks borrowed books by student username
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    // Set the list of books fetched from the server
    setBooks: (state, action) => {
      state.books = action.payload;
    },

    // Handle borrowing a book
    borrowBook: (state, action) => {
      const { bookId, username } = action.payload;

      // Find the book by its ID
      const bookIndex = state.books.findIndex((b) => b.id === bookId);
      if (bookIndex >= 0) {
        const book = state.books[bookIndex];

        // Decrease quantity and mark as borrowed only if quantity > 0
        if (book.quantity > 0) {
          book.quantity -= 1;

          // Track the borrowed book for the specific user
          if (!state.borrowedBooks[username]) {
            state.borrowedBooks[username] = [];
          }
          // Prevent borrowing the same book more than once
          if (!state.borrowedBooks[username].includes(bookId)) {
            state.borrowedBooks[username].push(bookId);
          }
        }
      }
    },

    // Handle returning a book
    returnBook: (state, action) => {
      const { bookId, username } = action.payload;

      // Find the book by its ID
      const bookIndex = state.books.findIndex((b) => b.id === bookId);
      if (bookIndex >= 0) {
        const book = state.books[bookIndex];

        // Increase quantity
        book.quantity += 1;

        // Remove the book from the user's borrowed list
        if (state.borrowedBooks[username]) {
          state.borrowedBooks[username] = state.borrowedBooks[username].filter(
            (borrowedBookId) => borrowedBookId !== bookId
          );

          // Clean up empty lists for the user
          if (state.borrowedBooks[username].length === 0) {
            delete state.borrowedBooks[username];
          }
        }
      }
    },
  },
});

export const { setBooks, borrowBook, returnBook } = booksSlice.actions;
export default booksSlice.reducer;
