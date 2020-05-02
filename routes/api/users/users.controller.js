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

/* 

  PUT /api/users/:user_id/works/:work_id

*/

exports.modifyWork = async (req, res, next) => {
  try {
    const { work_id: workId } = req.params;
    const { thumbnail: modifyThumbnail, cubes: modifyCubes } = req.body;

    await Work.findOneAndUpdate(
      { _id: workId },
      { thumbnail: modifyThumbnail },
      { cubes: modifyCubes }
    );

    res.status(200).json({
      result: "ok"
    });
  } catch {
    next(new ServerError());
  }
};

/* 

  DELETE /api/users/:user_id/works/:work_id

*/

exports.deleteWork = async (req, res, next) => {
  try {
    const { work_id: workId } = req.params;

    await Work.findOneAndDelete(workId);

    res.status(200).json({
      result: "ok"
    });
  } catch {
    next(new ServerError());
  }
};
