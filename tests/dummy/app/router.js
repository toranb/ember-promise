import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
    this.route("people", { path: "/" });
    this.route("default", { path: "/default" });
});

export default Router;
