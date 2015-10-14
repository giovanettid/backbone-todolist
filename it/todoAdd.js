
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

        return expect(todo.first()).to.eventually.equal('first todo');
    });

    it('ajout deuxieme todo dans la todo list',function() {
        todo.typeNew('second todo').enterNew();

        return Q.all([
            expect(todo.nbVisible()).to.eventually.have.length(2),
            expect(todo.nthText(2)).to.eventually.equal('second todo')
        ]);
    });

    after(function() {
        return todo.after();
    });
});
