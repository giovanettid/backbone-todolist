phantom.page.injectJs("it/page/todoPage.js");

casper.test.begin('Todo delete scenario', 3, function suite(test) {
    casper.start(casper.cli.get("urlstart"), function() {
        page.todo.reset();
    });

    casper.then(function() {
        test.comment("ajout deux todo dans la todo list et suppression second todo");

        page.todo.typeNew('first todo').enterNew();
        page.todo.typeNew('second todo').enterNew();
        page.todo.mouseOverNth(2).deleteNth(2);

        test.assertEquals(page.todo.first(),'first todo');
        test.assertEquals(page.todo.nbVisible(),1);
    });

    casper.then(function() {
        test.comment("suppression du seul todo restant");

        page.todo.mouseOverFirst();
        page.todo.deleteFirst();

        test.assertEquals(page.todo.nbVisible(),0);
    });

    casper.run(function() {
        test.done();
    });

});
