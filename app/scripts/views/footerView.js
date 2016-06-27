define([
    'marionette'
], function (Marionette) {
    'use strict';

    var FooterView = Marionette.ItemView.extend({
        template: '#footer-template'
    });

    return new FooterView();
});
