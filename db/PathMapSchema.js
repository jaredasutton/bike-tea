const { Schema } = require("mongoose");

module.exports = new Schema({
  name: String,
  userId: { type: Number, default: 5 },
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
