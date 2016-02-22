
describe('Todo delete scenario', function() {

    before(function() {
        return todo.before();
    });

    it('ajout deux todo dans la todo list et suppression second todo',function() {
        todo.typeNew('first todo').enterNew();
        todo.typeNew('second todo').enterNew();
        todo.mouseOverNth(2).deleteNth(2);

        return Q.all([
            expect(todo.first()).to.eventually.equal('first todo'),
            expect(todo.nbVisible()).to.eventually.have.length(1)
        ]);

    });

    it('suppression du seul todo restant',function() {
        todo.mouseOverFirst();
        todo.deleteFirst();

        return expect(todo.nbVisible()).to.eventually.be.empty;
    });

    after(function() {
        return todo.after();
    });

});
