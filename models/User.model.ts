import * as mongoose from 'mongoose'
import * as validator from 'validator';
import * as uniqueValidator from 'mongoose-unique-validator';
import * as bcrypt from 'bcryptjs';
//const mongoose = require('mongoose');
// const validate = require('validator');
// const uniqueValidator = require('mongoose-unique-validator');
// const bcrypt = require('bcryptjs');

const SALT_WORK_FACTOR = 10;

const UserSchema: mongoose.Schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [255, 'Name cannot be longer than 255 characters'],
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true, // Not a validator!
    minlength: [3, 'Username must be at least 3 characters long'],
    maxlength: [15, 'Username cannot be longer than 15 characters'],
    validate: {
      validator: function(v: any) {
        return validator.isAlphanumeric(v);
      },
      message: 'Username can only contain letters and numbers',
    },

  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    uniqueCaseInsensitive: true, // for mongoose-unique-validator
    validate: {
      validator: function(v: any) {
        return validator.isEmail(v);
      },
      message: '{VALUE} is not a valid email'
    },
    index: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'], // Is alleady a hash
    minlength: [7, 'Password must be at least 7 characters long'],
    maxlength: [50, 'Password cannot be longer than 50 characters'],
  },
  deletedAt: {
    type: Date,
  },
  timestamps: {
    type: Date,
  },
});

// Makes any unique field add validation errors, instad of MongoDB E11000 error
// Plugins extend schema functionality by adding middleware, paths etc
// uniqueValidator adds validators to paths that have unique option set to true
UserSchema.plugin(uniqueValidator, { message: '{PATH} is allready in use' });

UserSchema.pre('save', function (next:Function) {                                                                                                                                               
  var salt = bcrypt.genSaltSync(SALT_WORK_FACTOR)                                                                                                                                     
  this.password  = bcrypt.hashSync(this.password, salt)                                                                                                                                                                                                                                                                                 
  next()
});

/* Make a promise implementation */
UserSchema.methods.comparePassword = (candidatePassword: string, cb: Function) => {
  return bcrypt.compareSync(candidatePassword, this.password);
};


module.exports = mongoose.model('User', UserSchema);
