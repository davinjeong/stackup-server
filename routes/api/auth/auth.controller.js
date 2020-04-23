const bcrypt = require('bcrypt');
const User = require('../../../models/User');
const { SignupError, ServerError } = require('../../../lib/errors');

/* 

  POST /api/auth/signup 

*/

exports.signup = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;
    const user = await User.findOne({ email });

    if (user) return next(new SignupError());

    getHashAndSave();

    async function getHashAndSave() {
      const hash = await bcrypt.hash(password, 10);

      User.create({
        email,
        name,
        password: hash
      });
    }

    res.status(200).json({
      result: 'ok'
    });
  } catch {
    next(new ServerError());
  }
};
