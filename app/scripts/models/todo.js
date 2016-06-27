define([
    'backbone'
], function (Backbone) {
    'use strict';

    var Todo = Backbone.Model.extend({
        defaults: {
            title: '',
            completed: false
        },
        toggle: function () {
            this.set('completed', !this.get('completed'));
        },
        matchesFilter: function (filter) {
            if (!filter) {
                return true;
            }

            return this.get('completed')
                ? filter === 'completed'
                : filter === 'pending';
        }
    });
    return Todo;
});



