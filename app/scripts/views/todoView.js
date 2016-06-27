define([
    'marionette',
    'common'
], function (Marionette, Common) {
    'use strict';

    var TodoView = Marionette.ItemView.extend({

        tagName: 'li',
        template: '#item-template',

        ui: {
            edit: '.edit',
            destroy: '.destroy',
            label: 'label',
            toggle: '.toggle'
        },
        events: {
            'dblclick @ui.label': 'edit',
            'click @ui.toggle': 'toggleCompleted',
            'keypress @ui.edit': 'updateOnEnter',
            'blur @ui.edit' : 'close',
            'keydown @ui.edit': 'revertOnEscape',
            'click @ui.destroy': 'clear'
        },
        modelEvents: {
            change: 'render',
            destroy: 'destroy'
        },

        edit: function () {
            this.$el.addClass('editing');
            this.ui.edit.val(this.model.get('title'));
            this.ui.edit.focus();
        },

        updateOnEnter: function (e) {
            if (e.which === Common.ENTER_KEY) {
                this.close();
            }
        },

        revertOnEscape: function (e) {
            if (e.which === Common.ESC_KEY) {
                this.$el.removeClass('editing');
                // Also reset the hidden input back to the original value.
                this.ui.edit.val(this.model.get('title'));
            }
        },

        clear: function () {
            this.model.destroy();
        },

        close: function () {
            var trimmedValue = this.ui.edit.val().trim();
            if (trimmedValue) {
                this.ui.edit.val(trimmedValue);
                this.model.save({title: trimmedValue});
            }
            this.$el.removeClass('editing');
        },

        toggleCompleted: function () {
            this.model.toggle();
            this.model.save({completed: this.model.get('completed')});
        },

        onRender: function () {
            this.$el.toggleClass('completed', this.model.get('completed'));
        }

    });

    return TodoView;
});
