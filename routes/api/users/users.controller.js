require('dotenv').config();

const Work = require('../../../models/Work');
const { ServerError } = require('../../../lib/errors');

/* 

  POST /api/users/:user_id/work 

*/

exports.registerWork = async (req, res, next) => {
  try {
    const { user_id: userId } = req.params;
    const { created, thumbnail, cubes } = req.body;

    await Work.create({
      creator: userId,
      created,
      thumbnail,
      cubes
    });

    res.status(201).json({
      result: 'ok'
    });
  } catch {
    next(new ServerError());
  }
};
