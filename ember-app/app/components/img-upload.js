import Ember from 'ember';
import ENV from 'photojrnl/config/environment';

var $ = Ember.$;

export default Ember.Component.extend({
  fileSet: false,

  attachEvents: function() {
    var self = this;
    $('#img-file-input').on('change', function(e) {
      self.set('fileSet', true);
    });

    $('#imgUploadForm').submit(function(e) {
      e.preventDefault();
      var data = new FormData();
      $.each($('#img-file-input')[0].files, function(i, file) {
        data.append('file-' + i, file);
      });

      $.ajax({
        url: 'http://' + ENV.apiHost + '/photos',
        data: data,
        contentType: false,
        processData: false,
        type: 'POST'
      }).done(function(res) {
        res.photos.forEach(function(e, i) {
          self.sendAction('addNewPhoto', e._id);
        });
      }).fail(function(err) { console.log('fail', err); });
    });
  }.on('didInsertElement')
});
