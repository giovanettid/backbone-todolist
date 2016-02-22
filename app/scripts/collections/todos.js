define([
    'backbone',
    'collections/store',
    'models/todo'
], function(Backbone, Store, Todo) {
    'use strict';

    var Todos = Backbone.Collection.extend({
        model: Todo,
        localStorage: Store,

        completed: function() {
            return this.filter(function(todo) {
                return todo.get('completed');
                })
        },

        remaining: function() {
            return this.without.apply(this, this.completed());
        }

        });

    return new Todos();
});

