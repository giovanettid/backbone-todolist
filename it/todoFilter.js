
var todo = require("./page/todoPage.js");

describe('Todo fliter scenario', function() {
    before(function () {
        todo.before();
    });

    it('show completed todo',function() {
        todo.test(function() {
            todo.typeNew('first todo').enterNew();
            todo.typeNew('second todo').enterNew();
            todo.typeNew('third todo').enterNew();
            todo.done(2);

            expect(todo.nbVisible()).to.be.equal(3);

            todo.show('show completed');

            todo.waitNthNotVisible(1,function() {
                expect(todo.nbVisible()).to.be.equal(1);
            });
        });
    });

    it('show pending todo',function() {
        todo.test(function() {
            todo.show('show pending');

            todo.waitNthNotVisible(2,function() {
                expect(todo.nbVisible()).to.be.equal(2);
            });
        });
    });

    it('show all todo',function() {
        todo.test(function() {
            todo.show('show all');

            todo.waitNthVisible(2,function() {
                expect(todo.nbVisible()).to.be.equal(3);
            });
        });
    });

});
