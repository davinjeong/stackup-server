const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SampleSchema = new Schema({
  name: { type: String, required: true, unique: true },
  cubes: [
    {
      position: {
        x: { type: Number, required: true },
        y: { type: Number, required: true },
        z: { type: Number, required: true }
      },
      color: { type: String, required: true }
    }
  ]
});

module.exports = mongoose.model('Sample', SampleSchema);
