require('dotenv').config();

const Work = require('../../../models/Work');
const { WorkNotFoundError, ServerError } = require('../../../lib/errors');

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
  } catch (err) {
    next(new ServerError());
  }
};

/* 

  GET /api/users/:user_id/works

*/

exports.getUsersAllWorks = async (req, res, next) => {
  try {
    const { user_id: userId } = req.params;
    const works = await Work.find({ creator: userId }).populate('creator', 'name');

    res.status(200).json({
      result: 'ok',
      works
    });
  } catch (err) {
    next(new ServerError());
  }
};

/* 

  GET /api/users/:user_id/works/:work_id

*/

exports.getUsersWork = async (req, res, next) => {
  try {
    const { work_id: workId } = req.params;
    const work = await Work.findById(workId);

    if (!work) return next(new WorkNotFoundError());

    res.status(200).json({
      result: 'ok',
      work
    });
  } catch (err) {
    next(new ServerError());
  }
};

/* 

  PUT /api/users/:user_id/works/:work_id

*/

exports.modifyWork = async (req, res, next) => {
  try {
    const { work_id: workId } = req.params;
    const { thumbnail: modifiedThumbnail, cubes: modifiedCubes } = req.body;

    await Work.findOneAndUpdate(
      { _id: workId },
      { thumbnail: modifiedThumbnail },
      { cubes: modifiedCubes }
    );

    res.status(201).json({
      result: 'ok'
    });
  } catch (err) {
    next(new ServerError());
  }
};

/* 

  DELETE /api/users/:user_id/works/:work_id

*/

exports.deleteWork = async (req, res, next) => {
  try {
    const { work_id: workId } = req.params;

    await Work.deleteOne({ _id: workId });

    res.status(200).json({
      result: 'ok'
    });
  } catch (err) {
    next(new ServerError());
  }
};
