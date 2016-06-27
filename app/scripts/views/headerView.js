define([
    'marionette',
    'collections/todos',
    'common'
], function (Marionette, todos, Common) {
    'use strict';

    var HeaderView = Marionette.ItemView.extend({

        collection: todos,
        template: '#header-template',

        ui: {
            input: '#new-todo'
        },
        events: {
            'keypress @ui.input': 'createToDoEnter'
        },

        createToDoEnter: function (e) {
            var trimmedValue = this.ui.input.val().trim();
            if (e.which !== Common.ENTER_KEY || !trimmedValue) {
                return;
            }

            this.collection.create({title: trimmedValue, completed: false});
            this.ui.input.val('');
        }
    });

    return new HeaderView();
});
