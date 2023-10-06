# indi-gg-assignment
This is a simple Library Management System API built using Express.js, MongoDB, and Mongoose. It provides endpoints for user registration and authentication, book management, borrowing and returning books, searching for books
# Table of Contents
  Routes
  Data Structures
  

# Routes
# User Registration & Authentication
# Register a new user
  Route: /register
  Method: POST
  Description: Registers a new user with details like name, email, and password.
  Request Body:
  name (String, required): The user's name.
  email (String, required): The user's email.
  password (String, required): The user's password.
# Authenticate users for login
  Route: /login
  Method: POST
  Description: Authenticates users for login.
  Request Body:
  email (String, required): The user's email.
  password (String, required): The user's password.
  Response:
  Returns a JSON Web Token (JWT) for authenticated users.
## Book Management
  # Add new books
    Route: /books
    Method: POST
    Description: Adds new books with details like ISBN, title, author, published year, and quantity.
    Request Body:
    ISBN (String, required): The book's ISBN.
    title (String, required): The book's title.
    author (String, required): The book's author.
    publishedYear (Number, required): The year the book was published.
    quantity (Number, required): The quantity of books available.
    Update book details
    Route: /books/:id
    Method: PUT
    Description: Updates book details.
    Request Parameters:
    id (String, required): The ID of the book to be updated.
    Request Body:
    title (String): The updated book title.
    author (String): The updated book author.
    publishedYear (Number): The updated published year.
    quantity (Number): The updated quantity.
    Delete books
    Route: /books/:id
    Method: DELETE
    Description: Deletes a book by its ID.
    Request Parameters:
    id (String, required): The ID of the book to be deleted.
    List all available books
    Route: /books
    Method: GET
    Description: Lists all available books.
    Borrowing & Returning Books
    Borrow a book
    Route: /borrow
    Method: POST
    Description: Allows users to borrow a book.
    Request Body:
    userId (String, required): The ID of the user borrowing the book.
    bookId (String, required): The ID of the book being borrowed.
    Return a book
    Route: /return
    Method: POST
    Description: Allows users to return a borrowed book.
    Request Body:
    userId (String, required): The ID of the user returning the book.
    bookId (String, required): The ID of the book being returned.
    Search Functionality
    Search for a book
    Route: /search
    Method: GET
    Description: Allows users to search for a book by its title, author, or ISBN.
    Query Parameters:
    query (String, required): The search query (title, author, or ISBN).
## Data Structures
  #User Schema
  name (String): The user's name.
  email (String): The user's email.
  password (String): The user's hashed password.
  Book Schema
  ISBN (String): The book's ISBN.
  title (String): The book's title.
  author (String): The book's author.
  publishedYear (Number): The year the book was published.
  quantity (Number): The quantity of books available.
  BorrowedBook Schema
  userId (String): The ID of the user who borrowed the book.
  bookId (String): The ID of the borrowed book.
  borrowedDate (Date): The date the book was borrowed.
  returnDate (Date): The date the book was returned.
