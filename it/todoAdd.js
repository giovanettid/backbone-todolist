
describe('Todo add scenario', function () {
    'use strict';

    before(() => todo.before());

    it('titre de la page', () => expect(todo.title()).to.eventually.equal('TodoListWithBB'));

    it('titre de la todo list', () => expect(todo.titleList()).to.eventually.equal('todos'));

    it('ajout premier dans la todo list', function () {
        todo.typeNew('first todo').enterNew();

        return todo.waitNth(1, 'first todo');
    });

    it('ajout deuxieme todo dans la todo list', function () {
        todo.typeNew('second todo').enterNew();

        return Q.all([
            todo.waitNth(2, 'second todo'),
            expect(todo.nbVisible()).to.eventually.have.length(2)
        ]);
    });

    after(() => todo.after());
});
