const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('../lib/errors');

module.exports = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) return next(new AuthenticationError());

    const token = bearerToken.split(' ')[1];

    await jwt.verify(token, process.env.JWT_SECRET_KEY);

    next();
  } catch (err) {
    next(new AuthenticationError());
  }
};
