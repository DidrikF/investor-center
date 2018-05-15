const mongoose = require('mongoose');
const User = require('../models/User.model');
// const bcrypt = require('bcryptjs');
const config = require('../config');

function createUser() {
  const newUser = new User();
  // const saltRounds = 10;

  newUser.name = 'Didrik Fleischer';
  newUser.username = 'DidrikF';
  newUser.email = 'didrik@test.com';
  newUser.password = 'password123'; // bcrypt.hashSync('password123', saltRounds);

  return newUser.save()
    .then((user) => {
      console.log('User seeded to database');
      return Promise.resolve(user);
    })
    .catch((err) => {
      console.log(err);
    });
}


/*
* Database
*/
mongoose.Promise = global.Promise;
mongoose.connect(config.database.url)
  .then(() => {
    createUser();
  })
  .catch((err) => {
    console.log(err);
  });

