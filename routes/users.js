var express = require('express');
var router = express.Router();
const User = require('../Models/User');


/* GET users listing. */
router.get('/', (req, res, next) => {
  User.find({})
  .then(users => {
    // return res.render('books', { books });
    return res.status(200).json(users);
  })
  .catch(next);

});


router.post('/', (req, res, next) => {
  const {
    username,
    password
  } = req.body;

  if (!username || !password) {
    return res.status(422).json({
      error: 'empty'
    });
  }

  User.findOne({
      username
    }, 'username')
    .then((userExists) => {
      if (userExists) {
        return res.status(422).json({
          error: 'username-not-unique'
        });
      }

      // const salt = bcrypt.genSaltSync(10);
      // const hashPass = bcrypt.hashSync(password, salt);

      const newUser = User({
        username,
        // password hashPass,
        password,
      });

      return newUser.save().then(() => {
        req.session.currentUser = newUser;
        res.json(newUser);
      });
    })
    .catch(next);
});

router.post('/login', (req, res, next) => {
  if (req.session.currentUser) {
    return res.status(401).json({
      error: 'unauthorized'
    });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(422).json({
      error: 'validation'
    });
  }

  User.findOne({
      username
    })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          error: 'not-found'
        });
      }
      // if (bcrypt.compareSync(password, user.password)) {
        // req.session.currentUser = user;
        if ( password == user.password){
          return res.status(200).json(user);
        }
      // }
      return res.status(404).json({
        error: 'not-found'
      });
    })
    .catch(next);
});



module.exports = router;
