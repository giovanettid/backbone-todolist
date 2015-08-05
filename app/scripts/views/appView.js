var app = app || {};

(function ($) {
    'use strict';

    app.AppView = Backbone.View.extend({
        el: '#todoapp',

        initialize : function () {
            this.$input = this.$('#new-todo');

            this.listenTo(app.todos, 'add', this.addOne);
            //ou app.todos.on('add', this.addOne, this);
            this.listenTo(app.todos, 'reset', this.addAll);
            this.listenTo(app.todos, 'filter', this.filterAll);
            this.allCheckbox = this.$('#toggle-all')[0];

            app.todos.fetch();

        },

        events: {
            'keypress #new-todo': 'createToDoEnter',
            'click #toggle-all' : 'toggleAllComplete'
        },

        createToDoEnter: function(e) {
            if(e.which !== ENTER_KEY || !this.$input.val().trim()) {
                return;
            }

            app.todos.create(this.newAttributes());
            this.$input.val('');
        },

        addOne: function(todo){
            var view = new app.TodoView({model: todo});
            $('#todo-list').append(view.render().el);

        },

        addAll: function () {
            this.$('#todo-list').html('');
            app.todos.each(this.addOne, this);
        },

        filterOne: function (todo) {
            todo.trigger('visible');
        },

        filterAll: function () {
            app.todos.each(this.filterOne, this);
        },

        toggleAllComplete: function () {
            var completed = this.allCheckbox.checked;

            app.todos.each(function (todo) {
                todo.save({
                    completed: completed
                });
            });
        },

        newAttributes: function (){
            return {
                title: this.$input.val().trim(),
                completed: false
            }
        },

        render: function () {

        }
    });
})(jQuery);
