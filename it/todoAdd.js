phantom.page.injectJs("it/page/todoPage.js");

describe('Todo add scenario', function() {
    before(function () {
        casper.start(casper.cli.get("urlstart"), function () {
            page.todo.reset();
            expect("TodoListWithBB").to.matchTitle;
        });
    });

    it('titre de la todo list', function() {
        casper.then(function() {
            expect(page.todo.titleList()).to.equal('todos');
        });
    });

    it('ajout premier dans la todo list',function() {
        casper.then(function() {
            page.todo.typeNew('first todo').enterNew();
            expect(page.todo.first()).to.equal('first todo');
        });
    });

    it('ajout deuxieme todo dans la todo list',function() {
        casper.then(function() {
            page.todo.typeNew('second todo').enterNew();
            expect(page.todo.nbVisible()).to.equal(2);
            expect(page.todo.nthText(2)).to.equal('second todo');
        });
    });
});
