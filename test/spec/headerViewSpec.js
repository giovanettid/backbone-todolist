describe('headerView', function () {
    'use strict';
    var todos = requirejs('collections/todos'),
        headerView = requirejs('views/headerView'),
        Common = requirejs('common'),
        $ = requirejs('jquery');

    before(function () {
        headerView.render();
    });

    beforeEach(function () {
        todos.reset();
    });

    after(function () {
        headerView.remove();
    });

    describe('events', function () {
        describe('when keypress id new-todo', function () {

            var spyCreate,
                createEvent = function (eventName, keyCode) {
                    var e = $.Event(eventName);
                    e.which = keyCode;
                    return e;
                };

            before(function () {
                spyCreate = sinon.stub(todos, 'create');
            });

            beforeEach(function () {
                headerView.ui.input.val('todo1');
            });

            afterEach(function () {
                spyCreate.reset();
            });

            it('on enter key then todos create', function () {
                headerView.$el.find('#new-todo').trigger(createEvent('keypress', Common.ENTER_KEY));

                expect(headerView.ui.input.val()).to.be.empty;
                expect(spyCreate).to.have.been.calledWith({title: 'todo1', completed: false});
            });

            it('but no enter key fire no todos create call', function () {
                headerView.$el.find('#new-todo').trigger(createEvent('keypress', 65));

                expect(headerView.ui.input.val()).to.be.equal('todo1');
                expect(spyCreate).have.callCount(0);
            });
        });

    });
});
