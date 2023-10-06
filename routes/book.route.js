const express = require('express');
const { Book } = require('../model/book.model');
const {BorrowedBook} = require('../model/borrowedBook.model')
const bookRoute = express.Router();

// Creating a new book
bookRoute.post('/books', async (req, res) => {
  try {
    const { ISBN, title, author, publishedYear, quantity } = req.body;

    const book = new Book({ ISBN, title, author, publishedYear, quantity });
    await book.save();

    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: 'Error creating a new book' });
  }
});

// Updating book details
bookRoute.put('/books/:id', async (req, res) => {
  try {
    const ISBN = req.params.id;
    const { title, author, publishedYear, quantity } = req.body;

    const book = await Book.findByIdAndUpdate(
      ISBN,
      { title, author, publishedYear, quantity },
      { new: true }
    );

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'Error updating book details' });
  }
});

// Deleting a book
bookRoute.delete('/books/:id', async (req, res) => {
  try {
    const ISBN = req.params.id;
    const book = await Book.findByIdAndDelete(ISBN);

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting book' });
  }
});
// Borrowing a book
bookRoute.post('/borrowBook', async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    // Check if the book is available
    const book = await Book.findById(bookId);
    if (!book || book.quantity <= 0) {
      return res.status(404).json({ error: 'Book not available for borrowing,please wait until it is in stock' });
    }

    // Create a borrowed book entry
    const borrowedBook = new BorrowedBook({ userId, bookId, borrowedDate: new Date() });
    await borrowedBook.save();

    // Decrement the book's quantity
    book.quantity--;
    await book.save();

    res.status(201).json(borrowedBook);
  } catch (error) {
    res.status(500).json({ error: 'Error borrowing a book' });
  }
});
bookRoute.post('/returnBook', async (req, res) => {
  try {
    const { userId, bookId } = req.body;


    const borrowedBook = await BorrowedBook.findOne({ userId, bookId });
    if (!borrowedBook) {
      return res.status(404).json({ error: 'Book not found in your borrowed books.' });
    }

    
    borrowedBook.returnDate = new Date();
    await borrowedBook.save();

  
    const book = await Book.findById(bookId);
    book.quantity++;
    await book.save();

    res.json({ message: 'Book returned successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error returning a book' });
  }
});


// List of all available books
bookRoute.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching books' });
  }
});

bookRoute.get('/searchBook', async (req, res) => {
  try {
    const { query } = req.query;
    const regexQuery = new RegExp(query, 'i');

    const books = await Book.find({
      $or: [
        { title: regexQuery },
        { author: regexQuery },
        { ISBN: regexQuery },
      ],
    });

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: 'Error searching for books' });
  }
});

module.exports = {bookRoute};
