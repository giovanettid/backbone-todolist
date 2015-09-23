Feature: todo add feature

    Scenario: add todos in todo list
        When je saisis le todo "first todo"
        And je saisis le todo "second todo"
        Then le todo "first todo" est placé en position 1 dans la liste
        And le todo "second todo" est placé en position 2 dans la liste
