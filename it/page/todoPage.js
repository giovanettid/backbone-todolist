
var page = page || {};

(function () {
    'use strict';

    var mouse = require("mouse").create(casper);
    var _ = require('underscore');

    function TodoPage() {

        var idNew = '#new-todo';
        var title = '#header > h1';
        var children = '#todo-list li';
        var toggleAll = '#toggle-all';

        var nthChild = function(n) {
            return children+':nth-child('+n+')';
        };

        var nthChildAndSelector = function(selector,n) {
            return nthChild(n) + selector;
        };

        var nthLabel = _.partial(nthChildAndSelector,' label');
        var nthInput = _.partial(nthChildAndSelector,' input.edit');
        var nthDestroyBtn = _.partial(nthChildAndSelector,' button.destroy');
        var nthCheckbox = _.partial(nthChildAndSelector,' input.toggle');
        var nthHidden = _.partial(nthChildAndSelector,'.hidden');
        var nthNotHidden = _.partial(nthChildAndSelector,':not(.hidden)');

        this.reset = function() {
            return casper.evaluate(function() {
                app.todos.reset();
            });
        };

        this.titleList = function() {
            return casper.evaluate(function(selector) {
                return __utils__.findOne(selector).textContent;
            },title);
        };

        this.typeNew = function(newTodo) {
            casper.sendKeys(idNew, newTodo);
            return this;
        };

        this.enterNew = function() {
            casper.sendKeys(idNew, casper.page.event.key.Enter);
        };

        this.waitNthNotVisible = function(n,fn) {
            casper.waitForSelector(nthHidden(n),fn);
        };

        this.waitNthVisible = function(n,fn) {
            casper.waitForSelector(nthNotHidden(n),fn);
        };

        this.nbVisible = function() {
            return casper.evaluate(function(selector) {
                return _.chain(_.toArray(__utils__.findAll(selector)))
                            .filter(function(element){return window.getComputedStyle(element).display !== 'none';})
                            .reduce(function(count) { return ++count;},0)
                            .value();
            },children);
        };

        this.nthText = function(nth) {
            return casper.evaluate(function(selector) {
                return __utils__.findOne(selector).textContent;
            },nthLabel(nth));
        };

        this.mouseOverNth = function(nth) {
            mouse.move(nthChild(nth));
            return this;
        };

        this.deleteNth = function(nth) {
            casper.click(nthDestroyBtn(nth));
        };

        this.done = function(nth) {
            casper.click(nthCheckbox(nth));
        };

        this.doneAll = function() {
            casper.click(toggleAll);
        };

        this.undo = function(nth) {
            this.done(nth);
        };

        this.undoAll = function() {
            this.doneAll();
        };

        this.nthCompleted = function(nth) {
            return casper.evaluate(function(selector) {
                return __utils__.findOne(selector).checked;
            },nthCheckbox(nth));
        };

        this.doubleClickNth = function(nth) {
            mouse.doubleclick(nthLabel(nth));
        };

        this.editNth = function(nth,todo) {
            casper.sendKeys(nthInput(nth),todo);
            return this;
        };

        this.enterNth = function(nth) {
            casper.sendKeys(nthInput(nth), casper.page.event.key.Enter);
        };

        this.show = function(label) {
            casper.clickLabel(label,'a');
        };

        this.first = _.partial(this.nthText,1);
        this.mouseOverFirst = _.partial(this.mouseOverNth,1);
        this.deleteFirst = _.partial(this.deleteNth,1);
        this.doubleClickFirst = _.partial(this.doubleClickNth,1);
        this.editFirst = _.partial(this.editNth,1);
        this.enterFirst = _.partial(this.enterNth,1);
    }

    page.todo = new TodoPage();
}());

