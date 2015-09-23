Feature: todo done feature

    Scenario: cocher / décocher todos in todo list
        Given 3 todos dans la liste
        When je coche le "premier" todo
        And je coche le "deuxième" todo
        Then le "premier" todo est fait
        And le "deuxième" todo est fait
        And le "troisième" todo est à faire
        When je décoche le "deuxième" todo
        Then le "deuxième" todo est à faire

    Scenario: cocher / décocher tous les todos in todo list
        Given 2 todos dans la liste
        And je coche tous les todos
        Then le "premier" todo est fait
        And le "deuxième" todo est fait
        When je décoche tous les todos
        Then le "premier" todo est à faire
        And le "deuxième" todo est à faire
