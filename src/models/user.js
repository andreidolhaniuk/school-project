const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { EMAIL_OR_PASSWORD_ERROR } = require('../utils/errors');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    trim: true,
    unique: true,
    validate: (email) => {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(String(email).toLowerCase())) {
        throw new Error('Invalid email.');
      }
    },
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
});

userSchema.plugin(uniqueValidator);

// eslint-disable-next-line func-names
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// eslint-disable-next-line func-names
userSchema.statics.findUser = async function (email, password) {
  const User = this;
  const user = await User.findOne({ email });
  if (!user) {
    throw Error(EMAIL_OR_PASSWORD_ERROR);
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error(EMAIL_OR_PASSWORD_ERROR);
  }
  return user;
};

// eslint-disable-next-line func-names
userSchema.methods.getToken = async function () {
  const user = this;
  // eslint-disable-next-line no-underscore-dangle
  const token = jwt.sign({ _id: user._id.toString() }, process.env.SECRET_KEY);
  user.token = token;
  await user.save();
  return token;
};

module.exports = mongoose.model('User', userSchema);
