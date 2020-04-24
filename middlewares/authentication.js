const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('../lib/errors');

module.exports = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) return next(new AuthenticationError());

    token = token.split(' ')[1];

    await jwt.verify(token, process.env.JWT_SECRET_KEY);

    next();
  } catch (err) {
    next(new AuthenticationError());
  }
};
