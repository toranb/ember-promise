import Ember from "ember";
import { test, module } from 'qunit';
import startApp from '../helpers/start-app';
import ErrorHandler from "dummy/utilities/error-handler";
import SuccessHandler from "dummy/utilities/success-handler";

var App,
    originalTestAdapterException,
    originalLogger;

module('PromiseMixin.onError Acceptance Test', {
    beforeEach: function() {
        App = startApp();
        Ember.$.fauxjax.new({
            type: "GET",
            url: "/api/bad-with-handler",
            dataType: 'json',
            responseText: [],
            status: 401
        });
        ErrorHandler.accessed = undefined;
        ErrorHandler.handled = undefined;
        ErrorHandler.json = undefined;
        ErrorHandler.textStatus = undefined;
        ErrorHandler.errorThrown = undefined;
        SuccessHandler.handled =  undefined;
    },
    afterEach: function() {
        Ember.run(App, App.destroy);
    }
});

test("GET request will run through the onError function and be handled by error function", function(assert) {
    assert.equal(ErrorHandler.accessed, undefined);
    assert.equal(ErrorHandler.handled, undefined);
    assert.equal(ErrorHandler.json, undefined);
    assert.equal(ErrorHandler.textStatus, undefined);
    assert.equal(ErrorHandler.errorThrown, undefined);
    visit("/onerror-with-handler");
    andThen(function() {
        assert.equal(ErrorHandler.accessed, true);
        assert.equal(ErrorHandler.handled, 1);
        assert.equal(ErrorHandler.json.status, 401);
        assert.equal(ErrorHandler.textStatus, "error");
        assert.equal(ErrorHandler.errorThrown, "OK");
    });
});

test("promises keep chaining and error goes to success when no rejection thrown in first handler", function(assert) {
    assert.equal(ErrorHandler.accessed, undefined);
    assert.equal(ErrorHandler.handled, undefined);
    assert.equal(SuccessHandler.handled, undefined);
    assert.equal(ErrorHandler.json, undefined);
    assert.equal(ErrorHandler.textStatus, undefined);
    assert.equal(ErrorHandler.errorThrown, undefined);
    visit("/onerror-with-multiple-handlers");
    andThen(function() {
        assert.equal(ErrorHandler.accessed, true);
        assert.equal(ErrorHandler.handled, 1);
        assert.equal(SuccessHandler.handled, 1);
        assert.equal(ErrorHandler.json.status, 401);
        assert.equal(ErrorHandler.textStatus, "error");
        assert.equal(ErrorHandler.errorThrown, "OK");
    });
});

test("promises keep chaining to error when error handler errors", function(assert) {
    assert.equal(ErrorHandler.accessed, undefined);
    assert.equal(ErrorHandler.handled, undefined);
    assert.equal(SuccessHandler.handled, undefined);
    assert.equal(ErrorHandler.json, undefined);
    assert.equal(ErrorHandler.textStatus, undefined);
    assert.equal(ErrorHandler.errorThrown, undefined);
    visit("/onerror-with-multiple-error-handlers");
    andThen(function() {
        assert.equal(ErrorHandler.accessed, true);
        assert.equal(ErrorHandler.handled, 2);
        assert.equal(SuccessHandler.handled, undefined);
        assert.equal(ErrorHandler.json.status, 401);
        assert.equal(ErrorHandler.textStatus, "error");
        assert.equal(ErrorHandler.errorThrown, "OK");
    });
});
