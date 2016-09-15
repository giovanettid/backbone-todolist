
describe('Todo', function () {
    'use strict';
    const Todo = requirejs('models/todo');
    let todo;

    beforeEach(() => todo = new Todo());

    it('defaults are empty title and not completed', function () {
        expect(todo.get('title')).to.be.a('string').and.to.be.empty;
        expect(todo.get('completed')).to.be.false;
    });

    it('when toggle then completed', function () {
        todo.toggle();

        expect(todo.get('completed')).to.be.true;
    });

    describe('match filter', function () {
        const tests = [
            {filter: 'completed', completed: false, match: false},
            {filter: 'completed', completed: true, match: true},
            {filter: 'pending', completed: false, match: true},
            {filter: 'pending', completed: true, match: false},
            {filter: '', completed: false, match: true},
            {filter: '', completed: true, match: true}
        ];

        tests.forEach(function (test) {
            it(`when filter ${test.filter === '' ? 'empty' : test.filter} and todo ${test.completed ? '' : 'not '}completed then ${test.match ? '' : 'not '}match`,
                function () {
                    todo.set('completed', test.completed);

                    expect(todo.matchesFilter(test.filter)).to.equal(test.match);
                });
        });
    });
});
