const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SampleSchema = new Schema({
  name: { type: String, required: true, unique: true },
  icon: { type: String, required: true, unique: true },
  position: { type: Array, required: true }
});

module.exports = mongoose.model('Sample', SampleSchema);
