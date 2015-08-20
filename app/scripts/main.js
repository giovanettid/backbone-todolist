
require([
        'backbone',
        'views/appView',
        'routers/appRouter'
    ], function (Backbone, AppView, TodoRouter) {
        'use strict';

        new TodoRouter();
        Backbone.history.start();
        new AppView();
        console.log('create app view');
    });
