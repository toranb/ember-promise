import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
    this.route("people", { path: "/" });
    this.route("default", { path: "/default" });
    this.route("onerror", { path: "/onerror" });
    this.route("onerror-with-handler", { path: "/onerror-with-handler" });
    this.route("onerror-with-multiple-handlers", { path: "/onerror-with-multiple-handlers" });
    this.route("onerror-with-multiple-error-handlers", { path: "/onerror-with-multiple-error-handlers" });
});

export default Router;
