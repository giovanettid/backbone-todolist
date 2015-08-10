phantom.page.injectJs("it/page/todoPage.js");

describe('Todo done scenario', function() {
    before(function () {
        casper.start(casper.cli.get("urlstart"), function () {
            page.todo.reset();
        });
    });

    it('ajout trois todo dans la todo list et cocher deux premier todo done',function() {
        casper.then(function() {
            page.todo.typeNew('first todo').enterNew();
            page.todo.typeNew('second todo').enterNew();
            page.todo.typeNew('third todo').enterNew();
            page.todo.done(1);
            page.todo.done(2);

            expect(page.todo.nbVisible()).to.equal(3);
            expect(page.todo.nthCompleted(1)).to.be.true;
            expect(page.todo.nthCompleted(2)).to.be.true;
            expect(page.todo.nthCompleted(3)).to.be.false;
        });
    });

    it('decocher deuxieme todo',function() {
        casper.then(function() {
            page.todo.undo(2);

            expect(page.todo.nbVisible()).to.equal(3);
            expect(page.todo.nthCompleted(1)).to.be.true;
            expect(page.todo.nthCompleted(2)).to.be.false;
            expect(page.todo.nthCompleted(3)).to.be.false;
        });
    });

    it('cocher tous les todos',function() {
        casper.then(function() {
            page.todo.doneAll();

            expect(page.todo.nbVisible()).to.be.equal(3);
            expect(page.todo.nthCompleted(1)).to.be.true;
            expect(page.todo.nthCompleted(2)).to.be.true;
            expect(page.todo.nthCompleted(3)).to.be.true;
        });
    });

    it('decocher tous les todos',function() {
        casper.then(function() {
            page.todo.undoAll();

            expect(page.todo.nbVisible()).to.be.equal(3);
            expect(page.todo.nthCompleted(1)).to.be.false;
            expect(page.todo.nthCompleted(2)).to.be.false;
            expect(page.todo.nthCompleted(3)).to.be.false;
        });
    });

});

