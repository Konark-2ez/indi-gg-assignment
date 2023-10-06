const mongoose = require('mongoose');

// Borrowed Book Schema
const borrowedBookSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user.model', 
    required: true,
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'book.model', // Reference to the book model js file
    required: true,
  },
  borrowedDate: {
    type: Date,
    required: true,
  },
  returnDate: {
    type: Date,
  },
});

const BorrowedBook = mongoose.model('BorrowedBook', borrowedBookSchema);

module.exports = BorrowedBook;
