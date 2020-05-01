const { ServerError } = require('../../../lib/errors');
const Sample = require('../../../models/Sample');

/* 

  GET /api/samples

*/

exports.getSamples = async (req, res, next) => {
  try {
    const { shape } = req.params;
    const sample = await Sample.findOne({ name: shape });

    res.status(200).json({
      result: 'ok',
      sample
    });
  } catch {
    next(new ServerError());
  }
};
