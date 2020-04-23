const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkSchema = new Schema({
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  created: { type: Date, required: true },
  thumbnail: { type: String, required: true, unique: true },
  position: { type: Array, required: true }
});

module.exports = mongoose.model('Work', WorkSchema);
