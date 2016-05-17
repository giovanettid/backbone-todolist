describe('TodoView', function () {
    'use strict';
    var Todo = requirejs('models/todo'),
        TodoView = requirejs('views/todoView'),
        Common = requirejs('common'),
        $ = requirejs('jquery'),
        todo,
        todoView;

    beforeEach(function () {
        todo = new Todo();
        todoView = new TodoView({model:todo});
    });

    afterEach(function () {
        todoView.remove();
    });

    it('tagName should equal li', function () {
        expect(todoView.tagName).to.equal('li');
    });

    it('render view', function () {
        var view = new TodoView({model: new Todo({title: 'todo1', completed: true})});

        view.render();

        expect(view.$input.val()).to.equal('todo1');
        expect(view.$el.hasClass('completed')).to.be.true;
    });

    describe('listeners', function () {
        it('when model title change then render view', function () {
            todo.set('title', 'title updated');

            expect(todoView.$input.val()).to.equal('title updated');
        });

        it('when model destroy then remove view', function () {
            var spy = sinon.spy(todoView, 'remove');
            todoView.initialize();

            todo.destroy();

            expect(spy).have.been.called;
        });

        it('when model trigger visible then view has class hidden', function () {
            Common.TodoFilter = 'completed';

            todo.trigger('visible');

            expect(todoView.$el.hasClass('hidden')).to.be.true;
        });
    });

    describe('events', function () {

        var createEvent = function (eventName, keyCode) {
            var e = $.Event(eventName);
            e.which = keyCode;
            return e;
        };

        var setupOnEditModeWithValue = function (val) {
            todo.set('title', val);
            todoView.$el.find('label').dblclick();
        };

        describe('when click', function () {

            beforeEach(function () {
                todoView.render();
            });

            it('class toggle then model completed', function () {
                var spy = sinon.stub(todo, 'save');

                todoView.$el.find('.toggle').click();

                expect(todo.get('completed')).to.be.true;
                expect(spy).have.callCount(1);
            });

            it('class destroy then destroy model', function () {
                var spy = sinon.spy(todo, 'destroy');

                todoView.$el.find('.destroy').click();

                expect(spy).have.callCount(1);
            });
        });

        it('when double click label then switch to edit mode', function () {
            todo.set('title', 'todo1');

            todoView.$el.find('label').dblclick();

            expect(todoView.$el.hasClass('editing')).to.be.true;
            expect(todoView.$el.find('.edit:focus')).to.have.length(1);
        });

        describe('when keypress class edit', function () {
            it('on enter then save', function () {
                var spy = sinon.stub(todo, 'save');
                setupOnEditModeWithValue('todo1');

                todoView.$el.find('.edit').trigger(createEvent('keypress', Common.ENTER_KEY));

                expect(todoView.$el.hasClass('editing')).to.be.false;
                expect(spy).have.callCount(1);
            });

            describe('but not save', function() {
                var spy;

                beforeEach(function () {
                    spy = sinon.spy(todo, 'save');
                });

                [{value: '', description: 'empty'},
                    {value: ' ', description: 'with space'}]
                    .forEach(function (test) {
                        it('when enter and title ' + test.description, function () {
                            setupOnEditModeWithValue(test.value);

                            todoView.$el.find('.edit').trigger(createEvent('keypress', Common.ENTER_KEY));

                            expect(todoView.$el.hasClass('editing')).to.be.false;
                        });
                    });

                it('when not press enter', function () {
                    setupOnEditModeWithValue('todo1');

                    todoView.$el.find('.edit').trigger(createEvent('keypress', 65));

                    expect(todoView.$el.hasClass('editing')).to.be.true;
                });

                afterEach(function () {
                    expect(spy).have.callCount(0);
                });
            });
        });

        it('when blur class edit then save', function () {
            var spy = sinon.stub(todo, 'save');
            setupOnEditModeWithValue('todo1');

            todoView.$input.focusout();

            expect(todoView.$el.hasClass('editing')).to.be.false;
            expect(spy).have.callCount(1);
        });

        describe('when keydown class edit', function () {
            beforeEach(function () {
                setupOnEditModeWithValue('todo1');
                todoView.$input.val('todo1 updated');
            });

            it('on escape key then revert title', function () {
                todoView.$el.find('.edit').trigger(createEvent('keydown', Common.ESC_KEY));

                expect(todoView.$input.val()).to.equal('todo1');
                expect(todoView.$el.hasClass('editing')).to.be.false;
            });

            it('but no escape key fire no changes', function () {
                todoView.$el.find('.edit').trigger(createEvent('keydown', 65));

                expect(todoView.$input.val()).to.equal('todo1 updated');
                expect(todoView.$el.hasClass('editing')).to.be.true;
            });
        });

    });

    describe('is hidden', function () {
        var tests = [
            {filter: 'completed', completed: false, hidden: true},
            {filter: 'completed', completed: true, hidden: false},
            {filter: 'pending', completed: false, hidden: false},
            {filter: 'pending', completed: true, hidden: true},
            {filter: '', completed: false, hidden: false},
            {filter: '', completed: true, hidden: false}
        ];

        tests.forEach(function (test) {
            it('when filter '
                + (test.filter === '' ? 'empty' : test.filter)
                + ' and todo '
                + (test.completed ? '' : 'not ')
                + 'completed then hidden ' + test.hidden, function () {
                    Common.TodoFilter = test.filter;
                    todo.set('completed', test.completed);

                    expect(todoView.isHidden()).to.equal(test.hidden);
                });
        });
    });
});
