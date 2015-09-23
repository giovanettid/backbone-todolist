Feature: todo edit feature

    Scenario: edit todos in todo list
        When je saisis le todo "first todo"
        And je saisis le todo "second todo"
        And j'édite le "premier" todo avec la valeur " edited"
        Then le todo "first todo edited" est placé en position 1 dans la liste
