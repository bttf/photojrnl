import DS from 'ember-data';
import ENV from 'photojrnl/config/environment';

export default DS.RESTAdapter.extend({
  host: 'http://' + ENV.apiHost
});
