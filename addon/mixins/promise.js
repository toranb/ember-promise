import Ember from 'ember';

var PromiseMixin = Ember.Object.create({
    xhr: function(url, method, hash) {
        hash = hash || {};
        hash.url = url;
        hash.method = method || "GET";
        hash.dataType = "json";
        hash.cache = false;
        hash.contentType = "application/json";
        return new Ember.RSVP.Promise(function(resolve, reject) {
            hash.success = function(json) {
                return Ember.run(null, resolve, json);
            };
            hash.error = function(json) {
                if (json && json.then) {
                    json.then = null;
                }
                return Ember.run(null, reject, json);
            };
            $.ajax(hash);
        });
    }
});

export default PromiseMixin;
