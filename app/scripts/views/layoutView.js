define([
    'marionette'
], function (Marionette) {
    'use strict';

    var LayoutView = Marionette.LayoutView.extend({
        el: '#todoapp',
        regions: {
            header: '#header',
            main: '#main',
            footer: '#footer'
        }
    });

    return new LayoutView();
});
