Feature: todo filter feature

    Scenario: filter todos faits in todo list
        Given 3 todos dans la liste
        When je coche le "deuxième" todo
        And je filtre les todos faits
        Then la liste contient 1 todo(s)

    Scenario: filter todos à faire in todo list
        Given 3 todos dans la liste
        When je coche le "premier" todo
        And je filtre les todos à faire
        Then la liste contient 2 todo(s)

    Scenario: filtrer rétablir tous les todos in todo list
        Given 3 todos dans la liste
        When je coche le "premier" todo
        And je coche le "deuxième" todo
        And je filtre les todos à faire
        Then la liste contient 1 todo(s)
        When je montre tous les todos
        Then la liste contient 3 todo(s)
