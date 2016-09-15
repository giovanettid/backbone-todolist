
describe('Todo filter scenario', function() {
    'use strict';

    before(() => todo.before());

    it('show completed todo', function () {
        todo.typeNew('first todo').enterNew();
        todo.typeNew('second todo').enterNew();
        todo.typeNew('third todo').enterNew();
        todo.done(2);

        todo.filter.completed();

        return expect(todo.nbVisible()).to.eventually.have.length(1);
    });

    it('show pending todo', function () {
        todo.filter.pending();

        return expect(todo.nbVisible()).to.eventually.have.length(2);
    });

    it('show all todo', function () {
        todo.filter.all();

        return expect(todo.nbVisible()).to.eventually.have.length(3);
    });

    after(() => todo.after());

});
