
describe('Todos', function() {
    'use strict';
    var Todo = requirejs('models/todo'),
        todos = requirejs('collections/todos');

    beforeEach(function () {
        todos.reset();
    });

    it('filtering completed', function () {
        todos.set([{title: 'todo1', completed: true}, {title: 'todo2', completed: false}, {completed: true}]);

        var todosCompleted = todos.completed();

        expect(todosCompleted).to.have.length(2);
        expect(todosCompleted[0].get('completed')).to.be.true;
        expect(todosCompleted[1].get('completed')).to.be.true;

    });

    it('filtering remaining', function () {
        var todo1 = new Todo(),
            todo2 = new Todo(),
            todosRemaining;

        todo1.toggle();
        todos.set([todo1, todo2]);

        todosRemaining = todos.remaining();

        expect(todosRemaining).to.have.length(1);
        expect(todosRemaining[0]).to.eql(todo2);
    });
});
