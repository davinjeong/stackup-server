require('dotenv').config();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../../models/User');
const { SignupError, SigninError, ServerError } = require('../../../lib/errors');

/* 

  POST /api/auth/signup 

*/

exports.signup = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;
    const user = await User.findOne({ email });

    if (user) return next(new SignupError());

    const hash = await bcrypt.hash(password, 10);

    await User.create({
      email,
      name,
      password: hash
    });

    res.status(201).json({
      result: 'ok'
    });
  } catch {
    next(new ServerError());
  }
};

/* 

  POST /api/auth/signin

*/

exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) next(new SigninError());

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) return next(new SigninError());

    const token = await jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      result: 'ok',
      id: user._id,
      name: user.name,
      token
    });
  } catch {
    next(new ServerError());
  }
};
