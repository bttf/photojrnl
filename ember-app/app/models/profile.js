import DS from 'ember-data';

var attr = DS.attr;

export default DS.Model.extend({
  contactDesc: attr('string'),
  phone: attr('string'),
  email: attr('string'),
  twitter: attr('string'),
  facebook: attr('string'),
  instagram: attr('string'),
  location: attr('string'),
  aboutDesc: attr('string'),
  favoriteQuote: attr('string'),
  favQuoteAuthor: attr('string'),
  firstName: attr('string'),
  lastName: attr('string'),
  subtitle: attr('string')
});
