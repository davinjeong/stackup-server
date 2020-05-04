require('dotenv').config();

const Work = require('../../../models/Work');
const { WorkNotFoundError, ServerError } = require('../../../lib/errors');

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

/* 

  GET /api/works/:work_id

*/

exports.getWork = async (req, res, next) => {
  try {
    const { work_id: workId } = req.params;
    const work = await Work.findById(workId);

    if (!work) return next(new WorkNotFoundError());

    res.status(200).json({
      result: 'ok',
      work
    });
  } catch {
    next(new ServerError());
  }
};
