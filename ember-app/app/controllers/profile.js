import Ember from 'ember';

var $ = Ember.$;
var moment = window.moment;

export default Ember.Controller.extend({
  actions: {
    save: function(profile) {
      var self = this;
      profile.save().then(function() {
        var $savedMsg = $('._profile .saved-msg');
        self.set('saved', 'Saved @ ' + moment().format('MMMM Do YYYY, h:mm:ss a'));
        $savedMsg.show();
        setTimeout(function() {
          $savedMsg.fadeOut(500);
        }, 2000);
      }, function(err) {
        console.log('debug: profile not saved');
      });
    }
  }
});
