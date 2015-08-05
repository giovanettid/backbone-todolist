phantom.page.injectJs("it/page/todoPage.js");

casper.test.begin('Todo edit scenario', 3, function suite(test) {
    casper.start(casper.cli.get("urlstart"), function() {
        page.todo.reset();
    });

    casper.then(function() {
        test.comment("edition d'un todo");

        page.todo.typeNew('first todo').enterNew();
        page.todo.typeNew('second todo').enterNew();

        test.assertEquals(page.todo.nbVisible(),2);

        page.todo.doubleClickFirst();
        page.todo.editFirst(' edited').enterFirst();

        test.assertEquals(page.todo.first(),'first todo edited');
        test.assertEquals(page.todo.nbVisible(),2);
    });

    casper.run(function() {
        test.done();
    });
});
