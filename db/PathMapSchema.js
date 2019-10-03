const { Schema } = require("mongoose");

module.exports = new Schema({
  name: String,
  userId: Number,
  private: Boolean,
  paths: [{ snappedPoints: [], strokeColor: String, strokeWeight: Number }]
});
