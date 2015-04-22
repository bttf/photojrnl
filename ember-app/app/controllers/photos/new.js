import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    save: function(photo) {
      photo.save().then(function() {
        console.log('success mother fucker');
      }, function(err) {
        console.log('failure ass: ', err);
        console.dir(err);
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
