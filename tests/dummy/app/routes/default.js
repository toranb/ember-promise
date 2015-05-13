import Ember from "ember";
import PromiseMixin from "ember-promise/mixins/promise";

var DefaultRoute = Ember.Route.extend({
    model: function() {
        var people = Ember.A();
        PromiseMixin.xhr("/api/people").then(function(response) {
            response.forEach(function(person) {
                people.pushObject(Ember.Object.create(person));
            });
        });
        return people;
    }
});

export default DefaultRoute;
