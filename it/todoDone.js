
var todo = require("./page/todoPage.js");

describe('Todo done scenario', function() {
    before(function () {
        todo.before();
    });

    it('ajout trois todo dans la todo list et cocher deux premier todo done',function() {
        todo.test(function() {
            todo.typeNew('first todo').enterNew();
            todo.typeNew('second todo').enterNew();
            todo.typeNew('third todo').enterNew();
            todo.done(1);
            todo.done(2);

            expect(todo.nbVisible()).to.equal(3);
            expect(todo.nthCompleted(1)).to.be.true;
            expect(todo.nthCompleted(2)).to.be.true;
            expect(todo.nthCompleted(3)).to.be.false;
        });
    });

    it('decocher deuxieme todo',function() {
        todo.test(function() {
            todo.undo(2);

            expect(todo.nbVisible()).to.equal(3);
            expect(todo.nthCompleted(1)).to.be.true;
            expect(todo.nthCompleted(2)).to.be.false;
            expect(todo.nthCompleted(3)).to.be.false;
        });
    });

    it('cocher tous les todos',function() {
        todo.test(function() {
            todo.doneAll();

            expect(todo.nbVisible()).to.be.equal(3);
            expect(todo.nthCompleted(1)).to.be.true;
            expect(todo.nthCompleted(2)).to.be.true;
            expect(todo.nthCompleted(3)).to.be.true;
        });
    });

    it('decocher tous les todos',function() {
        todo.test(function() {
            todo.undoAll();

            expect(todo.nbVisible()).to.be.equal(3);
            expect(todo.nthCompleted(1)).to.be.false;
            expect(todo.nthCompleted(2)).to.be.false;
            expect(todo.nthCompleted(3)).to.be.false;
        });
    });

});

