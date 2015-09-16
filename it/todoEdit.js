
var todo = require("./page/todoPage");
var expect = require("./bower_components/chai/chai").expect;

describe('Todo edit scenario', function() {
    before(function (done) {
        todo.before(done);
    });

    it("edition d'un todo",function() {
        todo.typeNew('first todo').enterNew();
        todo.typeNew('second todo').enterNew();

        expect(todo.nbVisible()).to.be.equal(2);

        todo.doubleClickFirst();
        todo.editFirst(' edited').enterFirst();
        expect(todo.first()).to.be.equal('first todo edited');
        expect(todo.nbVisible()).to.be.equal(2);
    });
});

