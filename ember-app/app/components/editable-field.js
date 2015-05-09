import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['editable-field'],
  isEditing: false,

  actions: {
    toggleEdit: function() {
      this.toggleProperty('isEditing');
    }
  }
});
