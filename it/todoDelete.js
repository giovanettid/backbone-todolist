
var todo = require("./page/todoPage.js");

describe('Todo delete scenario', function() {
    before(function () {
        todo.before();
    });

    it('ajout deux todo dans la todo list et suppression second todo',function() {
        todo.test(function() {
            todo.typeNew('first todo').enterNew();
            todo.typeNew('second todo').enterNew();
            todo.mouseOverNth(2).deleteNth(2);

            expect(todo.first()).to.equal('first todo');
            expect(todo.nbVisible()).to.equal(1);
        });
    });

    it('suppression du seul todo restant',function() {
        todo.test(function() {
            todo.mouseOverFirst();
            todo.deleteFirst();

            expect(todo.nbVisible()).to.equal(0);
        });
    });

});
