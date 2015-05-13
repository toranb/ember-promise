import Ember from 'ember';

var PromiseMixin = Ember.Object.create({
    xhr: function(url, method, hash) {
        var self = this;
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
            hash.error = function(json, textStatus, errorThrown) {
                if (json && json.then) {
                    json.then = null;
                }
                Ember.run(self, "onError", json, textStatus, errorThrown);
                return Ember.run(null, reject, json);
            };
            Ember.$.ajax(hash);
        });
    },
    onError: function() {
    }
});

export default PromiseMixin;
