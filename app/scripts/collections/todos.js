var app = app || {};

(function () {
    'use strict';

    app.Todos = Backbone.Collection.extend({
        model: app.Todo,
        localStorage: new Backbone.LocalStorage("todos-backbone"),

        completed: function () {
            return this.filter(function (todo) {
                return todo.get('completed');
                })
        },

        remaining: function () {
            return this.without.apply(this, this.completed());
        }

        });

    app.todos = new app.Todos();
})();

