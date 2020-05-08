const Sample = require('../../../models/Sample');
const { SampleNotFoundError, ServerError } = require('../../../lib/errors');

/* 

  GET /api/samples/:shape

*/

exports.getSample = async (req, res, next) => {
  try {
    const { shape } = req.params;
    const sample = await Sample.findOne({ name: shape });

    if (!sample) return next(new SampleNotFoundError());

    res.status(200).json({
      result: 'ok',
      sample
    });
  } catch (err) {
    next(new ServerError());
  }
};
