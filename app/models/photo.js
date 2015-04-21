var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var PhotoSchema = new Schema({
  title: String,
  imgPath: String,
  camera: String,
  lens: String,
  focalLength: String,
  shutterSpeed: String,
  aperture: String,
  iso: String,
  location: String,
  albumId: String
});

mongoose.model('Photo', PhotoSchema);
