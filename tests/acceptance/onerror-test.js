import Ember from "ember";
import { test, module } from 'qunit';
import startApp from '../helpers/start-app';
import ErrorHandler from "dummy/utilities/error-handler";

var App,
    originalTestAdapterException,
    originalLogger;

module('PromiseMixin.onError Acceptance Test', {
    beforeEach: function() {
        App = startApp();
        originalTestAdapterException = Ember.Test.adapter.exception;
        originalLogger = Ember.Logger.error;
        Ember.Test.adapter.exception = function(){};
        Ember.Logger.error = function(){};
        ErrorHandler.accessed = undefined;
        ErrorHandler.handled = undefined;
        ErrorHandler.json = undefined;
        ErrorHandler.textStatus = undefined;
        ErrorHandler.errorThrown = undefined;
    },
    afterEach: function() {
        Ember.Test.adapter.exception = originalTestAdapterException;
        Ember.Logger.error = originalLogger;
        Ember.run(App, App.destroy);
    }
});

test("GET request will be handled by the onError function", function(assert) {
    assert.equal(ErrorHandler.accessed, undefined);
    assert.equal(ErrorHandler.handled, undefined);
    assert.equal(ErrorHandler.json, undefined);
    assert.equal(ErrorHandler.textStatus, undefined);
    assert.equal(ErrorHandler.errorThrown, undefined);
    Ember.$.fauxjax.new({type: "GET", url: "/api/bad", dataType: 'json', responseText: [], status: 401});
    visit("/onerror");
    andThen(function() {
        assert.equal(ErrorHandler.accessed, true);
        assert.equal(ErrorHandler.json.status, 401);
        assert.equal(ErrorHandler.textStatus, "error");
        assert.equal(ErrorHandler.errorThrown, "OK");
    });
});
