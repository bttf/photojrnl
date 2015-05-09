import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    save: function(profile) {
      profile.save().then(function() {
      }, function(err) {
      });
    }
  }
});
