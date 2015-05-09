import Ember from 'ember';

export default Ember.ArrayController.extend({
  sortProperties: ['updateDate'],
  sortAscending: false,
  actions: {
    deletePhoto: function(photo) {
      photo.destroyRecord().then(function() {
        console.log('debug: photo deleted');
      }, function(err) {
        console.log('debug: photo has not deleted', err);
      });
    }
  }
});
