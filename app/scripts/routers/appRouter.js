define([
    'marionette',
    'events/filterChannel'
], function (Marionette, filterChannel) {
    'use strict';

    var TodoController = Marionette.Object.extend({
        setFilter: function (params) {
            filterChannel.request('filterState').set('filter', params || '');
        }
    }),
        todoController = new TodoController(),
        AppRouter = Marionette.AppRouter.extend({
            controller: todoController,
            appRoutes: {
                "*filter": "setFilter"
            }
        });

    return AppRouter;
});
