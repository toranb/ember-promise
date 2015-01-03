# Ember-promise

[![Build Status][]](https://travis-ci.org/toranb/ember-promise)

## Description

A simple promise object that will wrap xhr resolve/reject with an ember.run

## Installation
```
# install via npm
$ npm install ember-promise --save-dev
```

## Basic Usage

```js
import Ember from 'ember';
import PromiseMixin from 'ember-promise/mixins/promise';

var PeopleRoute = Ember.Route.extend({
    model: function() {
        var people = [];
        PromiseMixin.xhr("/api/people", "GET").then(function(response) {
            response.forEach(function(person) {
                people.pushObject(Ember.Object.create(person));
            });
        });
        return people;
    }
});

export default PeopleRoute;
```

## Running the unit tests

    npm install
    ember test

## Example project

https://github.com/toranb/ember-cli-store-example

## License

Copyright © 2015 Toran Billups http://toranbillups.com

Licensed under the MIT License


[Build Status]: https://travis-ci.org/toranb/ember-promise.svg?branch=master
