const { Schema } = require("mongoose");

module.exports = new Schema({
  name: String,
  userId: Number,
  private: Boolean,
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
