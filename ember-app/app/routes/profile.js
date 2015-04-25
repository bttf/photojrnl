import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.find('profile').then(function(profiles) {
      return profiles.objectAt(0);
    });
  },
  setupController: function(controller, model) {
    if (model.get('length') < 1) {
      controller.set('model', this.store.createRecord('profile'));
    } else {
      controller.set('model', model);
    }
  }
});
