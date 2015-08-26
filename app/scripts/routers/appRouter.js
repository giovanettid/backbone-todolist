define([
    'jquery',
    'backbone',
    'collections/todos',
    'common'
], function ($, Backbone, Todos, Common) {
    'use  strict';
    var TodoRouter = Backbone.Router.extend({
        routes: {
            "*filter": 'setFilter'
        },
        setFilter: function (params) {
            Common.TodoFilter = params || '';
            Todos.trigger('filter');
        }
    });

    return TodoRouter;
});
