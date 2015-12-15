
var main = require("./main");
var todo = main.todo,
    expect = main.expect,
    Q = main.Q;

describe('Todo add scenario', function() {

    before(function() {
        return todo.before();
    });

    it('titre de la page', function() {
        return expect(todo.title()).to.eventually.equal('TodoListWithBB');
    });

    it('titre de la todo list', function() {
        return expect(todo.titleList()).to.eventually.equal('todos');
    });

    it('ajout premier dans la todo list',function() {
        todo.typeNew('first todo').enterNew();

        return todo.waitNth(1,'first todo');
    });

    it('ajout deuxieme todo dans la todo list',function() {
        todo.typeNew('second todo').enterNew();

        return Q.all([
            todo.waitNth(2,'second todo'),
            expect(todo.nbVisible()).to.eventually.have.length(2)
        ]);
    });

    after(function() {
        return todo.after();
    });
});
