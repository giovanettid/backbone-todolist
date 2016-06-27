define([
    'backbone',
    'collections/store',
    'models/todo'
], function (Backbone, Store, Todo) {
    'use strict';

    var Todos = Backbone.Collection.extend({
        model: Todo,
        localStorage: Store
    });

    return new Todos();
});

