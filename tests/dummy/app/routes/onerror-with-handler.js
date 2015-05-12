import Ember from "ember";
import PromiseMixin from "ember-promise/mixins/promise";
import ErrorHandler from "../utilities/error-handler";

var OnErrorRoute = Ember.Route.extend({
    model: function() {
        var people = [];
        PromiseMixin.onError = function(json, textStatus, errorThrown) {
            ErrorHandler.accessed = true;
            ErrorHandler.json = json;
            ErrorHandler.textStatus = textStatus;
            ErrorHandler.errorThrown = errorThrown;
        };
        PromiseMixin.xhr("/api/bad", "GET").then(function(response) {
            response.forEach(function(person) {
                people.pushObject(Ember.Object.create(person));
            });
        }, function() {
            ErrorHandler.handled = true;
        });
        return people;
    }
});

export default OnErrorRoute;
