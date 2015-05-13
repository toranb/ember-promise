import Ember from "ember";
import PromiseMixin from "ember-promise/mixins/promise";
import ErrorHandler from "../utilities/error-handler";
import SuccessHandler from "../utilities/success-handler";

var OnErrorRoute = Ember.Route.extend({
    model: function() {
        var people = Ember.A();
        PromiseMixin.xhr("/api/bad-with-handler", "GET").then(function(response) {
            response.forEach(function(person) {
                people.pushObject(Ember.Object.create(person));
            });
        }, function() {
            ErrorHandler.handled = 1;
        }).then(function(){
            SuccessHandler.handled = 1;
        }, function() {
            ErrorHandler.handled += 1;
        });
        return people;
    }
});

export default OnErrorRoute;
