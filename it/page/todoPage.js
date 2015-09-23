

var Browser = require('zombie');
var _ = require('../bower_components/underscore/underscore');
var config = require('../config');

function TodoPage() {
    'use strict';

    var ENTER_KEY = 13;

    var idNew = '#new-todo';
    var title = 'title';
    var titleList = '#header > h1';
    var children = '#todo-list li';
    var childrenVisible = '#todo-list li:not(.hidden)';
    var toggleAll = '#toggle-all';

    var nthChild = function(n) {
        return children+':nth-child('+n+')';
    };

    var nthChildAndSelector = function(selector,n) {
        return nthChild(n) + selector;
    };

    var enterKey = function(selector) {
        browser.evaluate("var e = $.Event('keypress');e.which = "+ENTER_KEY+";$('"+selector+"').trigger(e);");
    };

    var nthLabel = _.partial(nthChildAndSelector,' label');
    var nthInput = _.partial(nthChildAndSelector,' input.edit');
    var nthDestroyBtn = _.partial(nthChildAndSelector,' button.destroy');
    var nthCheckbox = _.partial(nthChildAndSelector,' input.toggle');
    var nthCompleted = _.partial(nthChildAndSelector,'.completed');
    var nthHidden = _.partial(nthChildAndSelector,'.hidden');
    var nthNotHidden = _.partial(nthChildAndSelector,':not(.hidden)');

    var browser = new Browser();

    this.before = function(done){
        browser.visit(config.url,done);
        browser.evaluate("window.localStorage.clear();");
    };

    this.title = function() {
        return browser.text(title);
    };

    this.titleList = function() {
        return browser.text(titleList);
    };

    this.typeNew = function(newTodo) {
        browser.fill(idNew, newTodo);
        return this;
    };

    this.enterNew = function() {
        enterKey(idNew);
    };

    this.nbVisible = function() {
        return browser.querySelectorAll(childrenVisible).length;
    };

    this.nthText = function(nth) {
        return browser.text(nthLabel(nth));
    };

    this.mouseOverNth = function(nth) {
        browser.fire(nthChild(nth),'mouseover');
        return this;
    };

    this.deleteNth = function(nth) {
        browser.click(nthDestroyBtn(nth));
    };

    this.done = function(nth) {
        browser.click(nthCheckbox(nth));
    };

    this.doneAll = function() {
        browser.evaluate("$('"+toggleAll+"').click()");
    };

    this.undo = function(nth) {
        this.done(nth);
    };

    this.undoAll = function() {
        this.doneAll();
    };

    this.nthCompleted = function(nth) {
        return _.isElement(browser.querySelector(nthCompleted(nth)));
    };

    this.doubleClickNth = function(nth) {
        browser.fire(nthLabel(nth),'dblclick');
    };

    this.editNth = function(nth,todo) {
        browser.fill(nthInput(nth),browser.text(nthLabel(nth))+todo);
        return this;
    };

    this.enterNth = function(nth) {
        enterKey(nthInput(nth));
    };

    this.first = _.partial(this.nthText,1);
    this.mouseOverFirst = _.partial(this.mouseOverNth,1);
    this.deleteFirst = _.partial(this.deleteNth,1);
    this.doubleClickFirst = _.partial(this.doubleClickNth,1);
    this.editFirst = _.partial(this.editNth,1);
    this.enterFirst = _.partial(this.enterNth,1);

}

module.exports = new TodoPage();

