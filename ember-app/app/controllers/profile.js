import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    save: function(profile) {
      console.log(profile.get('firstName'));
      profile.save().then(function() {
        console.log('profile saved');
      }, function(err) {
        console.log('error', err);
      });
    }
  }
});
