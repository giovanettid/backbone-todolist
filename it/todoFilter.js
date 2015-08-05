phantom.page.injectJs("it/page/todoPage.js");

casper.on('remote.message', function(message) {
    this.echo(message);
});

casper.test.begin('Todo fliter scenario', 4, function suite(test) {
    casper.start(casper.cli.get("urlstart"), function() {
        page.todo.reset();
    });

    casper.then(function() {
        test.comment("show completed todo");

        page.todo.typeNew('first todo').enterNew();
        page.todo.typeNew('second todo').enterNew();
        page.todo.typeNew('third todo').enterNew();
        page.todo.done(2);

        test.assertEquals(page.todo.nbVisible(),3);

        page.todo.show('show completed');

        page.todo.waitNthNotVisible(1,function() {
            test.assertEquals(page.todo.nbVisible(),1);
        });

    });

    casper.then(function() {
        test.comment("show pending todo");

        page.todo.show('show pending');

        page.todo.waitNthNotVisible(2,function() {
            test.assertEquals(page.todo.nbVisible(),2);
        });

    });

    casper.then(function() {
        test.comment("show all todo");

        page.todo.show('show all');

        page.todo.waitNthVisible(2,function() {
            test.assertEquals(page.todo.nbVisible(),3);
        });
    });

    casper.run(function() {
        test.done();
    });
});
