var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ProfileSchema = new Schema({
  contactDesc: String,
  phone: String,
  email: String,
  twitter: String,
  facebook: String,
  instagram: String,
  location: String,
  aboutDesc: String,
  favoriteQuote: String,
  favQuoteAuthor: String,
  firstName: String,
  lastName: String,
  subtitle: String
});

mongoose.model('Profile', ProfileSchema);
