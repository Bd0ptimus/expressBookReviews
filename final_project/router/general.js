const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(200).json({books: books});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn
  const book = books[isbn]
  return res.status(200).json({book: book});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const authorName = decodeURIComponent(req.params.author)
  const booksResult = []
  for (let bookId in books) {
    if (books.hasOwnProperty(bookId)) {
      if (books[bookId].author === authorName) {
        booksResult.push(books[bookId]);
      }
    }
  }
  return res.status(200).json({books: booksResult});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const titleName = decodeURIComponent(req.params.title)
  const booksResult = []
  for (let bookId in books) {
    if (books.hasOwnProperty(bookId)) {
      if (books[bookId].title === titleName) {
        booksResult.push(books[bookId]);
      }
    }
  }
  return res.status(200).json({books: booksResult});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here

  const isbn = req.params.isbn
  const book = books[isbn]
  return res.status(200).json({book_reviews: book.reviews});
});

module.exports.general = public_users;
