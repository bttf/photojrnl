import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    save: function(photo) {
      photo.save().then(function() {
        console.log('debug: success');
      }, function(err) {
        console.log('debug: failure', err);
      });
    },

    addNewPhoto: function(id) {
      var self = this;
      this.store.find('photo', id).then(function(photo) {
        self.get('model.photos').addObject(photo);
      });
    }
  }
});
