import Ember from "ember";
import PromiseMixin from "ember-promise/mixins/promise";

var PeopleRoute = Ember.Route.extend({
    model: function() {
        var people = [];
        PromiseMixin.xhr("/api/people", "GET").then(function(response) {
            response.forEach(function(person) {
                people.pushObject(Ember.Object.create(person));
            });
        });
        return people;
    }
});

export default PeopleRoute;
