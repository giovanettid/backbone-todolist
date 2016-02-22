describe('AppView', function() {

    var todos = requirejs('collections/todos');
    var AppView = requirejs('views/appView');
    var Common = requirejs('common');
    var $ = requirejs('jquery');

    var appView;
    var spyFetch;

    before(function() {
        spyFetch = sinon.stub(todos,'fetch');
        appView = new AppView();
    });

    beforeEach(function() {
        todos.reset();
    });

    after(function() {
       appView.remove();
    });

    describe('new AppView', function() {
        it('el id should equal todoapp', function() {
            expect(appView.el.id).to.equal('todoapp');
        });

        it('when initialize then fetch', function() {
            expect(spyFetch).have.been.called;
        });

        after(function() {
            spyFetch.restore();
        });

    });

    describe('listeners', function() {
        it('when add collection then render todo in TodoView', function() {
            todos.add({title: 'new todo', completed: false});

            expect(appView.$el.find('#todo-list li:last-child .edit').val()).to.equal('new todo');
        });

        it('when reset collection then render todos in TodoViews', function() {
            todos.reset([{title: 'todo1'}, {title: 'todo2'}]);

            expect(appView.$el.find('#todo-list li')).to.have.length(2);
        });

        it('when filter collection then render todos in TodoViews with filter', function() {
            todos.set([{title: 'todo1', completed: true}, {title: 'todo2', completed: false}]);
            Common.TodoFilter = 'completed';

            todos.trigger('filter');

            expect(appView.$el.find('#todo-list li.hidden')).to.have.length(1);
            expect(appView.$el.find('#todo-list li:not(.hidden) .edit').val()).to.equal('todo1');
        })
    });

    describe('events', function() {
        describe('when keypress id new-todo ', function() {

            var spyCreate;

            var createEvent = function(eventName, keyCode) {
                var e = $.Event(eventName);
                e.which = keyCode;
                return e;
            };

            before(function() {
                spyCreate = sinon.stub(todos, 'create');
            });

            beforeEach(function() {
                appView.$input.val('todo1');
            });

            afterEach(function() {
               spyCreate.reset();
            });

            it('on enter key then todos create', function() {
                appView.$el.find('#new-todo').trigger(createEvent('keypress', Common.ENTER_KEY));

                expect(appView.$input.val()).to.be.empty;
                expect(spyCreate).to.have.been.calledWith({title: 'todo1', completed: false});
            });

            it('but no enter key fire no todos create call', function() {
                appView.$el.find('#new-todo').trigger(createEvent('keypress', 65));

                expect(appView.$input.val()).to.be.equal('todo1');
                expect(spyCreate).have.callCount(0);
            });
        });

        it('when click id toggle-all then render all todos as completed', function() {
            todos.set([{title: 'todo1'}, {title: 'todo2'}]);
            todos.each(function (todo) {
                sinon.stub(todo,'save', function() {
                    todo.set('completed', true);
                });
            });

            appView.$el.find('#toggle-all').click();

            expect(appView.$el.find('#todo-list li.completed')).to.have.length(2);
        });
    });
});
