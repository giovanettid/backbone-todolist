phantom.page.injectJs("it/page/todoPage.js");

casper.test.begin('Todo delete scenario', 16, function suite(test) {
    casper.start(casper.cli.get("urlstart"), function() {
        page.todo.reset();
    });

    casper.then(function() {
        test.comment("ajout trois todo dans la todo list et cocher deux premier todo done");

        page.todo.typeNew('first todo').enterNew();
        page.todo.typeNew('second todo').enterNew();
        page.todo.typeNew('third todo').enterNew();
        page.todo.done(1);
        page.todo.done(2);

        test.assertEquals(page.todo.nbVisible(),3);
        test.assertTrue(page.todo.nthCompleted(1));
        test.assertTrue(page.todo.nthCompleted(2));
        test.assertFalse(page.todo.nthCompleted(3));

    });

    casper.then(function() {
        test.comment("decocher deuxieme todo");

        page.todo.undo(2);

        test.assertEquals(page.todo.nbVisible(),3);
        test.assertTrue(page.todo.nthCompleted(1));
        test.assertFalse(page.todo.nthCompleted(2));
        test.assertFalse(page.todo.nthCompleted(3));

    });

    casper.then(function() {
        test.comment("cocher tous les todos");

        page.todo.doneAll();

        test.assertEquals(page.todo.nbVisible(),3);
        test.assertTrue(page.todo.nthCompleted(1));
        test.assertTrue(page.todo.nthCompleted(2));
        test.assertTrue(page.todo.nthCompleted(3));

    });

    casper.then(function() {
        test.comment("decocher tous les todos");

        page.todo.undoAll();

        test.assertEquals(page.todo.nbVisible(),3);
        test.assertFalse(page.todo.nthCompleted(1));
        test.assertFalse(page.todo.nthCompleted(2));
        test.assertFalse(page.todo.nthCompleted(3));

    });

    casper.run(function() {
        test.done();
    });
});
