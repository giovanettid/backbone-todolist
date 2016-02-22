require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        backboneLocalstorage: {
            deps: [
                'backbone'
            ],
            exports: 'Store'
        }
    },
    paths: {
        backbone: '../bower_components/backbone/backbone',
        backboneLocalstorage: '../bower_components/backbone.localstorage/backbone.localStorage',
        lodash: '../bower_components/lodash/dist/lodash.compat',
        modernizr: '../bower_components/modernizr/modernizr',
        'todomvc-common': '../bower_components/todomvc-common/base',
        underscore: '../bower_components/underscore/underscore',
        'backbone.localstorage': '../bower_components/backbone.localstorage/backbone.localStorage',
        requirejs: '../bower_components/requirejs/require',
        jquery: '../bower_components/jquery/dist/jquery'
    },
    packages: [

    ]
});

require([
    'backbone',
    'views/appView',
    'routers/appRouter'
], function(Backbone, AppView, TodoRouter) {
    'use strict';

    new TodoRouter();
    Backbone.history.start();
    new AppView();
    console.log('create app view');
});

