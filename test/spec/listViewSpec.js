describe('listView', function () {
    'use strict';

    const Todo = requirejs('models/todo'),
        spyFetch = sinon.stub(requirejs('collections/todos'), 'fetch'),
        listView = requirejs('views/listView'),
        filterChannel = requirejs('events/filterChannel');

    before(() => listView.render());

    beforeEach(() => listView.collection.reset());

    after(() => listView.destroy());

    it('when initialize then fetch', () => expect(spyFetch).have.been.called);

    it('when add collection then render todo in TodoView', function () {
        listView.collection.add({title: 'new todo', completed: false});

        expect(listView.$el.find('#todo-list li:last-child .edit').val()).to.equal('new todo');
    });

    it('when click id toggle-all then render all todos as completed', function () {
        listView.collection.set([{title: 'todo1'}, {title: 'todo2'}]);
        listView.collection.each(function (todo) {
            sinon.stub(todo, 'save', function () {
                todo.set('completed', true);
            });
        });

        listView.$el.find('#toggle-all').click();

        expect(listView.$el.find('#todo-list li.completed')).to.have.length(2);
    });

    it('when filterState completed and todo completed then filter return true', function () {
        filterChannel.request('filterState').set('filter', 'completed');
        const todo = new Todo({title: 'new todo', completed: true});

        expect(listView.filter(todo)).to.be.true;
    });

});
