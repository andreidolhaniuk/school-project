const jwt = require('jsonwebtoken');

const User = require('../models/user');
const errors = require('../utils/errors');

const auth = async (req, res, next) => {
  try {
    let token = req.header('Authorization');
    if (token) {
      token = token.replace('Bearer ', '');
      const tokenObj = jwt.verify(token, process.env.SECRET_KEY);
      // eslint-disable-next-line no-underscore-dangle
      const user = await User.findOne({ _id: tokenObj._id, token });
      if (!user) {
        throw new Error();
      }
      req.user = user;
      next();
    } else {
      res.status(401).send({ error: errors.TOKEN_ERROR });
    }
  } catch (e) {
    res.status(401).send({ error: errors.TOKEN_ERROR });
  }
};

module.exports = auth;
