import DS from 'ember-data';

var attr = DS.attr;

export default DS.Model.extend({
 firstName: attr('string'),
 lastName: attr('string'),
 title: attr('string'),
 bio: attr('string'),
 quote: attr('string'),
 location: attr('string'),
 phone: attr('string'),
 email: attr('string'),
 twitter: attr('string'),
 facebook: attr('string'),
 instagram: attr('string')
});
