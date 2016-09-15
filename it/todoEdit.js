
describe('Todo edit scenario', function () {
    'use strict';

    before(() => todo.before());

    it("edition d'un todo", function () {
        todo.typeNew('first todo').enterNew();
        todo.typeNew('second todo').enterNew();

        todo.doubleClickFirst();
        todo.editFirst(' edited').enterFirst();

        return Q.all([
            expect(todo.first()).to.be.eventually.equal('first todo edited'),
            expect(todo.nbVisible()).to.eventually.have.length(2)
        ]);

    });

    after(() => todo.after());

});

