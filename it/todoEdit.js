phantom.page.injectJs("it/page/todoPage.js");

describe('Todo edit scenario', function() {
    before(function () {
        casper.start(casper.cli.get("urlstart"), function () {
            page.todo.reset();
        });
    });

    it("edition d'un todo",function() {
        casper.then(function() {
            page.todo.typeNew('first todo').enterNew();
            page.todo.typeNew('second todo').enterNew();

            expect(page.todo.nbVisible()).to.be.equal(2);

            page.todo.doubleClickFirst();
            page.todo.editFirst(' edited').enterFirst();

            expect(page.todo.first()).to.be.equal('first todo edited');
            expect(page.todo.nbVisible()).to.be.equal(2);
        });
    });
});

