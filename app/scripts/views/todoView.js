define([
    'jquery',
    'backbone',
    'common'
], function ($, Backbone, Common) {
    'use strict';

    var TodoView = Backbone.View.extend({
        tagName: 'li',

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
            this.listenTo(this.model, 'visible', this.toggleVisible);
        },

        events: {
            'dblclick label': 'edit',
            'click .toggle': 'toggleCompleted',
            'keypress .edit': 'updateOnEnter',
            'blur .edit' : 'close',
            'keydown .edit': 'revertOnEscape',
            'click .destroy': 'destroyModel'
        },

        edit: function() {
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

        destroyModel: function(){
            this.model.destroy();
        },

        close: function() {
            if (!this.$el.hasClass('editing')) {
                return;
            }
            var value = this.$input.val().trim();
            if(value) {
                this.model.save({title: value});
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
        },

        render: function () {
            var template =  _.template($('#item-template').html());
            this.$el.html(template(this.model.toJSON()));
            this.$el.toggleClass('completed', this.model.get('completed'));
            this.$input = this.$('.edit');
            return this; //enable chained calls
        }
    });

    return TodoView;
});
