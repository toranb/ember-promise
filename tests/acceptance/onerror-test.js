import Ember from "ember";
import { test } from 'ember-qunit';
import startApp from '../helpers/start-app';
import ErrorHandler from "dummy/utilities/error-handler";

var App,
    originalTestAdapterException,
    originalLogger;

module('PromiseMixin.onError Acceptance Test', {
    setup: function() {
        App = startApp();
        originalTestAdapterException = Ember.Test.adapter.exception;
        originalLogger = Ember.Logger.error;
        Ember.Test.adapter.exception = function(){};
        Ember.Logger.error = function(){};
        var people = [{id: 1, firstName: 'toran', lastName: 'billups'}, {id: 2, firstName: 'brandon', lastName: 'williams'}];
        $.fauxjax.new({type: "GET", url: "/api/bad", dataType: 'json', responseText: people, status: 401});
    },
    teardown: function() {
        Ember.Test.adapter.exception = originalTestAdapterException;
        Ember.Logger.error = originalLogger;
        Ember.run(App, App.destroy);
    }
});

test("GET request will be handled by the onError function", function(assert) {
    visit("/onerror");
    andThen(function() {
        assert.equal(ErrorHandler.accessed, true);
        assert.equal(ErrorHandler.json.status, 401);
        assert.equal(ErrorHandler.textStatus, "error");
        assert.equal(ErrorHandler.errorThrown, "OK");
    });
});

test("GET request will run through the onError function and be handled by error function", function(assert) {
    visit("/onerror-with-default");
    andThen(function() {
        assert.equal(ErrorHandler.accessed, true);
        assert.equal(ErrorHandler.handled, true);
        assert.equal(ErrorHandler.json.status, 401);
        assert.equal(ErrorHandler.textStatus, "error");
        assert.equal(ErrorHandler.errorThrown, "OK");
    });
});
