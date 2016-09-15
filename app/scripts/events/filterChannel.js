define([
    'backbone',
    'backbone.radio'
], function (Backbone, Radio) {
    'use strict';

    var filterState = new Backbone.Model({
            filter: ''
        }),
        filterChannel = Radio.channel('filter');

    filterChannel.reply('filterState', function () {
        return filterState;
    });

    return filterChannel;
});
