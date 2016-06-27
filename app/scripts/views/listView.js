define([
    'marionette',
    'collections/todos',
    'views/todoView',
    'events/filterChannel'
], function (Marionette, todos, TodoView, filterChannel) {
    'use strict';

    var ListView = Marionette.CompositeView.extend({

        collection: todos,
        childView: TodoView,

        template: '#main-template',
        childViewContainer: '#todo-list',

        ui: {
            allCheckbox: '#toggle-all'
        },
        events: {
            'click @ui.allCheckbox' : 'toggleAllComplete'
        },

        initialize : function () {
            this.listenTo(filterChannel.request('filterState'), 'change:filter', this.render);
            this.collection.fetch();
        },

        filter: function (child) {
            var filteredOn = filterChannel.request('filterState').get('filter');
            return child.matchesFilter(filteredOn);
        },

        toggleAllComplete: function () {
            var completed = this.ui.allCheckbox.prop('checked');
            this.collection.each(function (todo) {
                todo.save({
                    completed: completed
                });
            });
        }

    });

    return new ListView();
});
