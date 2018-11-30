const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: String,
  pages: String,
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;