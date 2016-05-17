define([
    'jquery',
    'backbone',
    'common'
], function ($, Backbone, Common) {
    'use strict';

    var TodoView = Backbone.View.extend({
        tagName: 'li',

        events: {
            'dblclick label': 'edit',
            'click .toggle': 'toggleCompleted',
            'keypress .edit': 'updateOnEnter',
            'blur .edit' : 'close',
            'keydown .edit': 'revertOnEscape',
            'click .destroy': 'clear'
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
            this.listenTo(this.model, 'visible', this.toggleVisible);
        },

        edit: function () {
            this.$el.addClass('editing');
            this.$input.val(this.model.get('title'));
            this.$input.focus();
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
                this.$input.val(this.model.get('title'));
            }
        },

        clear: function () {
            this.model.destroy();
        },

        close: function () {
            var trimmedValue = this.$input.val().trim();
            if (trimmedValue) {
                this.$input.val(trimmedValue);
                this.model.save({title: trimmedValue});
            }
            this.$el.removeClass('editing');
        },

        toggleVisible: function () {
            this.$el.toggleClass('hidden', this.isHidden());
        },

        isHidden: function () {
            return this.model.get('completed') ?
                      Common.TodoFilter === 'pending' :
                      Common.TodoFilter === 'completed';
        },

        toggleCompleted: function () {
            this.model.toggle();
            this.model.save({completed: this.model.get('completed')});
        },

        render: function () {
            var template =  _.template($('#item-template').html());
            this.$el.html(template(this.model.toJSON()));
            this.$el.toggleClass('completed', this.model.get('completed'));
            this.toggleVisible();
            this.$input = this.$('.edit');
            return this;
        }
    });

    return TodoView;
});
