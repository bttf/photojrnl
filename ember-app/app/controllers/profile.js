import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    save: function(profile) {
      profile.save().then(function() {
        console.log('debug: profile saved');
      }, function(err) {
        console.log('debug: profile not saved');
      });
    }
  }
});
