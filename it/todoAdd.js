phantom.page.injectJs("it/page/todoPage.js");

casper.test.begin('Todo add scenario', 5, function suite(test) {
    casper.start(casper.cli.get("urlstart"), function() {
        page.todo.reset();
        test.assertTitle("TodoListWithBB");
    });

    casper.then(function() {
        test.comment("titre de la todo list");

        test.assertEquals(page.todo.titleList(), 'todos');
    });

    casper.then(function() {
        test.comment("ajout premier dans la todo list");

        page.todo.typeNew('first todo').enterNew();
        test.assertEquals(page.todo.first(),'first todo');
    });

    casper.then(function() {
        test.comment("ajout deuxieme todo dans la todo list");

        page.todo.typeNew('second todo').enterNew();
        test.assertEquals(page.todo.nbVisible(),2);
        test.assertEquals(page.todo.nthText(2),'second todo');
    });

    casper.run(function() {
        test.done();
    });
});
