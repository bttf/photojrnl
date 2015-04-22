import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    deletePhoto: function(photo) {
      photo.destroyRecord().then(function() {
        console.log('whaat, it worked');
      }, function(err) {
        console.log('shit has hit the fan', err);
      });
    }
  }
});
