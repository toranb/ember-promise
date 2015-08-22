import Ember from 'ember';

var PromiseMixin = Ember.Object.create({
    xhr: function(url, method, hash) {
        var self = this;
        hash = hash || {};
        hash.url = url;
        hash.method = method;
        hash = this.configureAjaxDefaults(hash);
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
    configureAjaxDefaults: function(hash) {
        if(!hash.method) {
            hash.method = "GET";
        }
        if(hash.dataType === undefined) {
            hash.dataType = "json";
        }
        if(hash.cache === undefined) {
            hash.cache = false;
        }
        if(hash.contentType === undefined && hash.method !== "GET") {
            hash.contentType = "application/json";
        }
        return hash;
    },
    onError: function() { }
});

export default PromiseMixin;
