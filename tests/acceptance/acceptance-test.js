import Ember from "ember";
import { test, module } from 'qunit';
import startApp from '../helpers/start-app';

var App;

module('PromiseMixin Acceptance Test', {
    beforeEach: function() {
        App = startApp();
        var people = [{id: 1, firstName: 'toran', lastName: 'billups'}, {id: 2, firstName: 'brandon', lastName: 'williams'}];
        Ember.$.fauxjax.new({type: "GET", url: "/api/people", dataType: 'json', responseText: people});
    },
    afterEach: function() {
        Ember.run(App, App.destroy);
    }
});

test("GET requests will resolve correctly", function(assert) {
    visit("/");
    andThen(function() {
        var rows = find(".name");
        assert.equal(rows.length, 2);
        var first = find(".name:eq(0)").text();
        assert.equal(first, "toran");
        var last = find(".name:eq(1)").text();
        assert.equal(last, "brandon");
    });
});

test("GET request will be the default type if not specified", function(assert) {
    visit("/default");
    andThen(function() {
        var rows = find(".name");
        assert.equal(rows.length, 2);
        var first = find(".name:eq(0)").text();
        assert.equal(first, "toran");
        var last = find(".name:eq(1)").text();
        assert.equal(last, "brandon");
    });
});
