
var main = require("./main");
var todo = main.todo,
    expect = main.expect,
    Q = main.Q;

describe('Todo filter scenario', function() {

    before(function () {
        return todo.before();
    });

    it('show completed todo',function() {
        todo.typeNew('first todo').enterNew();
        todo.typeNew('second todo').enterNew();
        todo.typeNew('third todo').enterNew();
        todo.done(2);

        todo.show('show completed');

        return expect(todo.nbVisible()).to.eventually.have.length(1);
    });

    it('show pending todo',function() {
        todo.show('show pending');

        return expect(todo.nbVisible()).to.eventually.have.length(2);
    });

    it('show all todo',function() {
        todo.show('show all');

        return expect(todo.nbVisible()).to.eventually.have.length(3);
    });

    after(function() {
        return todo.after();
    });

});
