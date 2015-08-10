phantom.page.injectJs("it/page/todoPage.js");

describe('Todo delete scenario', function() {
    before(function () {
        casper.start(casper.cli.get("urlstart"), function () {
            page.todo.reset();
        });
    });

    it('ajout deux todo dans la todo list et suppression second todo',function() {
        casper.then(function() {
            page.todo.typeNew('first todo').enterNew();
            page.todo.typeNew('second todo').enterNew();
            page.todo.mouseOverNth(2).deleteNth(2);

            expect(page.todo.first()).to.equal('first todo');
            expect(page.todo.nbVisible()).to.equal(1);
        });
    });

    it('suppression du seul todo restant',function() {
        casper.then(function() {
            page.todo.mouseOverFirst();
            page.todo.deleteFirst();

            expect(page.todo.nbVisible()).to.equal(0);
        });
    });

});
