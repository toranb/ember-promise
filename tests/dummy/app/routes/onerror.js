import Ember from "ember";
import PromiseMixin from "ember-promise/mixins/promise";
import ErrorHandler from "../utilities/error-handler";

var OnErrorRoute = Ember.Route.extend({
    model: function() {
        var people = Ember.A();
        PromiseMixin.xhr("/api/bad", "GET").then(function(response) {
            response.forEach(function(person) {
                people.pushObject(Ember.Object.create(person));
            });
        });
        return people;
    }
});

export default OnErrorRoute;
