Feature: todo delete feature

    Scenario: delete todos in todo list
        When je saisis le todo "first todo"
        And je saisis le todo "second todo"
        And je supprime le todo placé en position 2 dans la liste
        Then la liste contient 1 todo(s)
        And le todo "first todo" est placé en position 1 dans la liste
