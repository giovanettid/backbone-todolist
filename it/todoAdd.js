
var todo = require("./page/todoPage.js");

describe('Todo add scenario', function() {
    before(function () {
        todo.before();
    });

    it('titre de la page', function() {
        todo.test(function() {
            expect("TodoListWithBB").to.matchTitle;
        });
    });

    it('titre de la todo list', function() {
        todo.test(function() {
            expect(todo.titleList()).to.equal('todos');
        });
    });

    it('ajout premier dans la todo list',function() {
        todo.test(function() {
            todo.typeNew('first todo').enterNew();
            expect(todo.first()).to.equal('first todo');
        });
    });

    it('ajout deuxieme todo dans la todo list',function() {
        todo.test(function() {
            todo.typeNew('second todo').enterNew();
            expect(todo.nbVisible()).to.equal(2);
            expect(todo.nthText(2)).to.equal('second todo');
        });
    });
});
