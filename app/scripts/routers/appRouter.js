var app = app || {};

(function () {
    'use  strict';
    app.TodoRouter = Backbone.Router.extend({
        routes: {
            "*filter": 'setFilter'
        },
        setFilter: function (params) {
            console.log('params: ' + params);
            window.filter = params || '';
            app.todos.trigger('reset');
        }
    });
})();
