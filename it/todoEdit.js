
var todo = require("./page/todoPage.js");

describe('Todo edit scenario', function() {
    before(function () {
        todo.before();
    });

    it("edition d'un todo",function() {
        todo.test(function() {
            todo.typeNew('first todo').enterNew();
            todo.typeNew('second todo').enterNew();

            expect(todo.nbVisible()).to.be.equal(2);

            todo.doubleClickFirst();
            todo.editFirst(' edited').enterFirst();

            expect(todo.first()).to.be.equal('first todo edited');
            expect(todo.nbVisible()).to.be.equal(2);
        });
    });
});

