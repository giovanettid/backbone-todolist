describe('headerView', function () {
    'use strict';
    const todos = requirejs('collections/todos'),
        headerView = requirejs('views/headerView'),
        Common = requirejs('common'),
        $ = requirejs('jquery');

    before(() => headerView.render());

    beforeEach(() => todos.reset());

    after(() => headerView.remove());

    describe('events', function () {
        describe('when keypress id new-todo', function () {

            const createEvent = function (eventName, keyCode) {
                const e = $.Event(eventName);
                e.which = keyCode;
                return e;
            };
            let spyCreate;

            before(() => spyCreate = sinon.stub(todos, 'create'));

            beforeEach(() => headerView.ui.input.val('todo1'));

            afterEach(() => spyCreate.reset());

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
