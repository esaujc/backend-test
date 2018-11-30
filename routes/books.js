var express = require('express');
var router = express.Router();
const Book = require('../Models/Book');
const User = require('../Models/User');



/* GET users listing. */
router.get('/', (req, res, next) => {
  
  Book.find({})
  .then(books => {
    // return res.render('books', { books });
    return res.status(200).json(books);
  })
  .catch(next);

});

router.get('/:id', (req, res, next) => {
  const idBook = req.params.id;
  const user = req.session.currentUser._id;

  if (user){
    Book.findById(idBook)
    .then(book => {
      return res.render('book', { book });
      // return res.status(200).json(book);
    })
    .catch(next);
  }
});

router.post('/', (req, res, next) => {
  //Con Postman funciona cuando usas el Body con formato 'x-www-form-urlencoded'
  const {
    title,
    pages,
  } = req.body;

  const newBook = Book({
    title,
    pages,
  });

  return newBook.save()
  .then((user) => {
    if (!user) {
      res.status(422).json('Error adding user');  
    }else {
      res.status(200).json(newBook);
    }
  })
  .catch(next);


})

module.exports = router;
