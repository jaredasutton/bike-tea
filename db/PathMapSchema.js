const { Schema } = require("mongoose");

module.exports = new Schema({
  name: String,
  userId: Number,
  private: { type: Boolean, default: false },
  zoom: { type: Number, default: 12 },
  paths: [
    {
      description: String,
      snappedPoints: [],
      strokeColor: String,
      strokeWeight: Number
    }
  ]
});
