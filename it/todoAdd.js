
var todo = require("./page/todoPage");
var expect = require("./bower_components/chai/chai").expect;

describe('Todo add scenario', function() {
    before(function(done) {
        todo.before(done);
    });

    it('titre de la page', function() {
        expect(todo.title()).to.equal('TodoListWithBB');
    });

    it('titre de la todo list', function() {
        expect(todo.titleList()).to.equal('todos');
    });

    it('ajout premier dans la todo list',function() {
        todo.typeNew('first todo').enterNew();
        expect(todo.first()).to.equal('first todo');
    });

    it('ajout deuxieme todo dans la todo list',function() {
        todo.typeNew('second todo').enterNew();
        expect(todo.nbVisible()).to.equal(2);
        expect(todo.nthText(2)).to.equal('second todo');
    });
});
