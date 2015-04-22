import DS from 'ember-data';

var attr = DS.attr,
  belongsTo = DS.belongsTo;

export default DS.Model.extend({
  title: attr('string'),
  imgPath: attr('string'),
  camera: attr('string'),
  lens: attr('string'),
  focalLength: attr('string'),
  shutterSpeed: attr('string'),
  apperture: attr('string'),
  iso: attr('string'),
  location: attr('string'),
  album: belongsTo('album')
});
