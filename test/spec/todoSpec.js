
describe('Todo', function() {

    var Todo = requirejs('models/todo');

    var todo;

    beforeEach(function() {
        todo = new Todo();
    });

    it('defaults are empty title and not completed', function() {
        expect(todo.get('title')).to.be.a('string').and.to.be.empty;
        expect(todo.get('completed')).to.be.false;
    });

    it('when toggle then completed', function() {
        todo.toggle();

        expect(todo.get('completed')).to.be.true;
    });
});
