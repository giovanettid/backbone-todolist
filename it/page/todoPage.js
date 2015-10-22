
var config = require('../config');
var _ = require('../bower_components/underscore/underscore');

var webdriverio = require('webdriverio');

function TodoPage() {
    'use strict';

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
        client = client.addValue(selector,'Enter');
    };

    var show = function(filter) {
        client = client.click('#footer a[href="#/'+filter+'"]');
    };

    var nthLabel = _.partial(nthChildAndSelector,' label');
    var nthInput = _.partial(nthChildAndSelector,' input.edit');
    var nthDestroyBtn = _.partial(nthChildAndSelector,' button.destroy');
    var nthCheckbox = _.partial(nthChildAndSelector,' input.toggle');
    var nthCompleted = _.partial(nthChildAndSelector,'.completed');
    var nthHidden = _.partial(nthChildAndSelector,'.hidden');
    var nthNotHidden = _.partial(nthChildAndSelector,':not(.hidden)');


    var options = {
        desiredCapabilities: {
            browserName: config.browser
        }
    };

    var client;

    this.before = function() {
        client = webdriverio.remote(options);
        return client.init().url(config.url).execute('window.localStorage.clear();').refresh();
    };

    this.after = function() {
        return client.end();
    };

    this.title = function() {
        return client.getTitle();
    };

    this.titleList = function() {
        return client.getText(titleList);
    };

    this.typeNew = function(newTodo) {
        client = client.setValue(idNew,newTodo);
        return this;
    };

    this.enterNew = function() {
        enterKey(idNew);
    };

    this.nbVisible = function() {
        return client.isVisible(childrenVisible, function(err,res){
            return _.filter([].concat(res),function(isTrue) {
                return isTrue;
            })
        });
    };

    this.nthText = function(nth) {
        return client.getText(nthLabel(nth));
    };

    this.mouseOverNth = function(nth) {
        client = client.moveToObject(nthChild(nth)).moveToObject(nthDestroyBtn(nth));
        return this;
    };

    this.deleteNth = function(nth) {
        client = client.click(nthDestroyBtn(nth));
    };

    this.done = function(nth) {
        client = client.click(nthCheckbox(nth));
    };

    this.doneAll = function() {
        client = client.click(toggleAll);
    };

    this.undo = function(nth) {
        this.done(nth);
    };

    this.undoAll = function() {
        this.doneAll();
    };

    this.nthCompleted = function(nth) {
        return client.isVisible(nthCompleted(nth));
    };

    this.doubleClickNth = function(nth) {
        client = client.moveToObject(nthLabel(nth)).doubleClick(nthLabel(nth));
    };

    this.editNth = function(nth,todo) {
        client = client.addValue(nthInput(nth),todo);
        return this;
    };

    this.enterNth = function(nth) {
        enterKey(nthInput(nth));
    };

    this.filter = {
        all : _.partial(show,''),
        pending : _.partial(show,'pending'),
        completed : _.partial(show,'completed')
    };

    this.first = _.partial(this.nthText,1);
    this.mouseOverFirst = _.partial(this.mouseOverNth,1);
    this.deleteFirst = _.partial(this.deleteNth,1);
    this.doubleClickFirst = _.partial(this.doubleClickNth,1);
    this.editFirst = _.partial(this.editNth,1);
    this.enterFirst = _.partial(this.enterNth,1);

}

module.exports = new TodoPage();
