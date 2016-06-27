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
        'backbone.radio': '../bower_components/backbone.radio/build/backbone.radio',
        marionette: '../bower_components/marionette/lib/backbone.marionette',
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
    'marionette',
    'views/layoutView',
    'views/headerView',
    'views/listView',
    'views/footerView',
    'routers/appRouter'
], function (Backbone, Marionette, layoutView, headerView, listView, footerView, AppRouter) {
    'use strict';

    var TodoApp = Marionette.Application.extend({}),
        App = new TodoApp();

    App.on('start', function () {
        new AppRouter();
        Backbone.history.start();

        layoutView.showChildView('header', headerView);
        layoutView.showChildView('main', listView);
        layoutView.showChildView('footer', footerView);
    });

    App.start();
});

