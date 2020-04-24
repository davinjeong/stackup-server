require('dotenv').config();

const bcrypt = require('bcrypt');
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
    const userData = checkUserData(user);
    const hash = await bcrypt.hash(password, 10);

    await User.create({
      email,
      name,
      password: hash
    });

    function checkUserData(user) {
      return user && next(new SignupError());
    }

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
    const userData = checkUserData(user);
    const isPasswordValid = await bcrypt.compare(password, userData.password);
    
    if (!isPasswordValid) return next(new SigninError());

    const token = await jwt.sign(
      { id: user._id }, 
      process.env.JWT_SECRET_KEY, 
      { expiresIn: '7d'}
    );

    function checkUserData(user) {
      return user || next(new SigninError());
    }

    res.status(201).json({
      result: 'ok',
      id: userData._id,
      name: userData.name,
      token
    });
  } catch {
    next(new ServerError());
  }
};
