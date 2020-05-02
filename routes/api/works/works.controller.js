require('dotenv').config();

const Work = require('../../../models/Work');
const { ServerError } = require('../../../lib/errors');

/* 

  GET /api/works

*/

exports.getAllWorks = async (req, res, next) => {
  try {
    const works = await Work.find().populate('creator', 'name');
    
    res.status(200).json({
      result: 'ok',
      works
    });
  } catch {
    next(new ServerError());
  }
};
