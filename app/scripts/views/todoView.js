var app = app || {};

(function (){
    'use strict';

    app.TodoView = Backbone.View.extend({
        tagName: 'li',

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
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
            if (e.which === ENTER_KEY) {
                this.close();
            }
        },

        revertOnEscape: function (e) {
            if (e.which === ESC_KEY) {
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

})();
