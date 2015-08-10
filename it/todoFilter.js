phantom.page.injectJs("it/page/todoPage.js");

describe('Todo fliter scenario', function() {
    before(function () {
        casper.on('remote.message', function(message) {
            this.echo(message);
        });
        casper.start(casper.cli.get("urlstart"), function () {
            page.todo.reset();
        });
    });

    it('show completed todo',function() {
        casper.then(function() {
            page.todo.typeNew('first todo').enterNew();
            page.todo.typeNew('second todo').enterNew();
            page.todo.typeNew('third todo').enterNew();
            page.todo.done(2);

            expect(page.todo.nbVisible()).to.be.equal(3);

            page.todo.show('show completed');

            page.todo.waitNthNotVisible(1,function() {
                expect(page.todo.nbVisible()).to.be.equal(1);
            });
        });
    });

    it('show pending todo',function() {
        casper.then(function() {
            page.todo.show('show pending');

            page.todo.waitNthNotVisible(2,function() {
                expect(page.todo.nbVisible()).to.be.equal(2);
            });
        });
    });

    it('show all todo',function() {
        casper.then(function() {
            page.todo.show('show all');

            page.todo.waitNthVisible(2,function() {
                expect(page.todo.nbVisible()).to.be.equal(3);
            });
        });
    });

});
