import Ember from "ember";
import { test } from 'ember-qunit';
import startApp from '../helpers/start-app';

var App;

module('PromiseMixin Acceptance Test', {
    setup: function() {
        App = startApp();
    },
    teardown: function() {
        Ember.run(App, App.destroy);
    }
});

test("GET requests will resolve correctly", function() {
    var people = [{id: 1, firstName: 'toran', lastName: 'billups'}, {id: 2, firstName: 'brandon', lastName: 'williams'}];
    $.fauxjax.new({type: "GET", url: "/api/people", dataType: 'json', responseText: people});
    visit("/");
    andThen(function() {
        var rows = find(".name");
        equal(rows.length, 2);
        var first = find(".name:eq(0)").text();
        equal(first, "toran");
        var last = find(".name:eq(1)").text();
        equal(last, "brandon");
    });
});
