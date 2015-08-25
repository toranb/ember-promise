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
    var hash = PromiseMixin.configureAjaxDefaults({data: JSON.stringify({}), method: "POST"});
    assert.equal(Object.keys(hash).length, 5);
    assert.equal(hash.method, "POST");
    assert.equal(hash.dataType, "json");
    assert.equal(hash.cache, false);
    assert.equal(hash.contentType, "application/json");
    assert.equal(hash.data, "{}");
});

test("Test default configuration respects values already set for AJAX requests", function(assert) {
    var postData = {};
    var configuredHash = {
        data: postData,
        method: "POST",
        dataType: "text",
        cache: true,
        contentType: "text/plain"
    };
    var hash = PromiseMixin.configureAjaxDefaults(configuredHash);
    assert.equal(Object.keys(hash).length, 5);
    assert.equal(hash.method, "POST");
    assert.equal(hash.dataType, "text");
    assert.equal(hash.cache, true);
    assert.equal(hash.contentType, "text/plain");
    assert.equal(hash.data, postData);
});
