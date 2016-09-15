
describe('Todo done scenario', function () {
    'use strict';

    before(() => todo.before());

    it('ajout trois todo dans la todo list et cocher deux premier todo done', function () {
        todo.typeNew('first todo').enterNew();
        todo.typeNew('second todo').enterNew();
        todo.typeNew('third todo').enterNew();
        todo.done(1);
        todo.done(2);

        return Q.all([
            expect(todo.nbVisible()).to.eventually.have.length(3),
            expect(todo.nthCompleted(1)).to.eventually.be.true,
            expect(todo.nthCompleted(2)).to.eventually.be.true,
            expect(todo.nthCompleted(3)).to.eventually.be.false
        ]);
    });

    it('decocher deuxieme todo', function () {
        todo.undo(2);

        return Q.all([
            expect(todo.nbVisible()).to.eventually.have.length(3),
            expect(todo.nthCompleted(1)).to.eventually.be.true,
            expect(todo.nthCompleted(2)).to.eventually.be.false,
            expect(todo.nthCompleted(3)).to.eventually.be.false
        ]);
    });

    it('cocher tous les todos', function () {
        todo.doneAll();

        return Q.all([
            expect(todo.nbVisible()).to.eventually.have.length(3),
            expect(todo.nthCompleted(1)).to.eventually.be.true,
            expect(todo.nthCompleted(2)).to.eventually.be.true,
            expect(todo.nthCompleted(3)).to.eventually.be.true
        ]);
    });

    it('decocher tous les todos', function () {
        todo.undoAll();

        return Q.all([
            expect(todo.nbVisible()).to.eventually.have.length(3),
            expect(todo.nthCompleted(1)).to.eventually.be.false,
            expect(todo.nthCompleted(2)).to.eventually.be.false,
            expect(todo.nthCompleted(3)).to.eventually.be.false
        ]);
    });

    after(() => todo.after());

});

