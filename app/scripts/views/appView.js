define([
    'backbone',
    'collections/todos',
    'views/todoView',
    'common'
], function (Backbone, Todos, TodoView, Common) {
    'use strict';

    var AppView = Backbone.View.extend({

        events: {
            'keypress #new-todo': 'createToDoEnter',
            'click #toggle-all' : 'toggleAllComplete'
        },

        initialize : function () {
            this.$input = this.$('#new-todo');

            this.listenTo(Todos, 'add', this.addOne);
            this.listenTo(Todos, 'reset', this.addAll);
            this.listenTo(Todos, 'filter', this.filterAll);
            this.allCheckbox = this.$('#toggle-all')[0];

            Todos.fetch();
        },

        el: '#todoapp',

        createToDoEnter: function (e) {
            if (e.which !== Common.ENTER_KEY || !this.$input.val().trim()) {
                return;
            }

            Todos.create(this.newAttributes());
            this.$input.val('');
        },

        addOne: function (todo) {
            var view = new TodoView({model: todo});
            this.$('#todo-list').append(view.render().el);

        },

        addAll: function () {
            this.$('#todo-list').html('');
            Todos.each(this.addOne, this);
        },

        filterOne: function (todo) {
            todo.trigger('visible');
        },

        filterAll: function () {
            Todos.each(this.filterOne, this);
        },

        toggleAllComplete: function () {
            var completed = this.allCheckbox.checked;
            Todos.each(function (todo) {
                todo.save({
                    completed: completed
                });
            });
        },

        newAttributes: function () {
            return {
                title: this.$input.val().trim(),
                completed: false
            };
        }
    });

    return AppView;
});
