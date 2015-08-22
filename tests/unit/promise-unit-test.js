import { test, module } from 'qunit';
import PromiseMixin from "ember-promise/mixins/promise";

module('PromiseMixin Unit Test');

test("Test default configuration for AJAX GET requests", function(assert) {
    var hash = PromiseMixin.configureAjaxDefaults({});
    assert.equal(Object.keys(hash).length, 3);
    assert.equal(hash.method, "GET");
    assert.equal(hash.dataType, "json");
    assert.equal(hash.cache, false);
});

test("Test default configuration for AJAX Other requests", function(assert) {
    var hash = PromiseMixin.configureAjaxDefaults({method: "OTHER"});
    assert.equal(Object.keys(hash).length, 4);
    assert.equal(hash.method, "OTHER");
    assert.equal(hash.dataType, "json");
    assert.equal(hash.cache, false);
    assert.equal(hash.contentType, "application/json");
});

test("Test default configuration respects values already set for AJAX requests", function(assert) {
    var configuredHash = {
        method: "OTHER",
        dataType: "text",
        cache: true,
        contentType: "text/plain"
    };
    var hash = PromiseMixin.configureAjaxDefaults(configuredHash);
    assert.equal(Object.keys(hash).length, 4);
    assert.equal(hash.method, "OTHER");
    assert.equal(hash.dataType, "text");
    assert.equal(hash.cache, true);
    assert.equal(hash.contentType, "text/plain");
});
