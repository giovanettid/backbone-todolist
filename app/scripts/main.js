var app = app || {};

var ENTER_KEY = 13;
var ESC_KEY = 27;

$(function () {
    'use strict';

    app.router = new app.TodoRouter();
    Backbone.history.start();
    new app.AppView();

});
