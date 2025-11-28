Note: 
Admin username : ADMIN
Admin Passowrd: ADMIN

Library Management System

Overview
The Library Management System is a secure and user-friendly web application designed for managing books in a library. It includes authentication, role-based access control (RBAC), and CRUD operations for managing books. Admins can manage book records, while authenticated users can view and borrow books.


Features:

*Backend (Spring Boot)*

JWT Authentication:

->Login and register APIs for secure user authentication.
->Middleware for validating JWTs on protected routes.
->Role-Based Access Control (RBAC):
->Admin users can add, edit, and delete books.
->Regular users can borrow and return books.

CRUD Operations:

->Fetch, add, update, and delete books.
->Update book status to "borrowed" or "available."

MySQL Database:

->User and book data persistence.

*Frontend (React.js + TailwindCSS)*

Login Page:

->Capture username and password.
->Store JWT securely in Redux toolkit for API calls.

Authenticated Pages:
->Regular Users: View books, borrow, and return functionality.
->Admin Users: Add, edit, and delete books.

Responsive Design:
->Styled with TailwindCSS for a clean, minimal UI.

Tech Stack
->Backend: Spring Boot, Spring Security, MySQL.
->Frontend: React.js, TailwindCSS.
->Authentication: JSON Web Tokens (JWT).

Database: MySQL.

API Endpoints

Authentication
POST /students/register: Register a new user.

POST /auth/login: Authenticate a user or Admin issue a JWT.

Book Management

GET /books/getBooks: Fetch all books (authenticated users).
POST /books/create: Add a new book (admin only).
PUT /books/update/:id: Update book details (admin only).
DELETE /books/delete/:id: Delete a book (admin only).
PATCH /books/:id/status: Update book status to "borrowed" or "available."

Roles

Admin:
->Manage books (add, update, delete).
User:
->View and borrow/return books.


