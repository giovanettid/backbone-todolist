
const config = require('../config'),
   webdriverio = require('webdriverio');

function TodoPage() {
    'use strict';

    const idNew = '#new-todo',
        titleList = '#header h1',
        children = '#todo-list li',
        toggleAll = '#toggle-all';

    const nthChild = (n) => `${children}:nth-child(${n})`;

    const nthChildAndSelector = (selector, n) => nthChild(n) + selector;

    const filterSelector = (filter) => `#footer a[href="#/${filter}"]`;

    let client;

    const enterKey = (selector) => client = client.addValue(selector, 'Enter');

    const show = (filter) => client = client.click(filterSelector(filter));

    const nthLabel = (n) => nthChildAndSelector(' label', n),
        nthInput = (n) => nthChildAndSelector(' input.edit', n),
        nthDestroyBtn = (n) => nthChildAndSelector(' button.destroy', n),
        nthCheckbox = (n) => nthChildAndSelector(' input.toggle', n),
        nthCompleted = (n) => nthChildAndSelector('.completed', n);

    this.before = function () {
        client = webdriverio.remote(config.options);
        return client.init().url(config.url).execute('window.localStorage.clear();').refresh()
            .waitForVisible(filterSelector('completed'));
    };

    this.after = () => client.end();

    this.title = () => client.getTitle();

    this.titleList = () => client.getText(titleList);

    this.typeNew = function (newTodo) {
        client = client.setValue(idNew, newTodo);
        return this;
    };

    this.enterNew = () => enterKey(idNew);

    this.nbVisible = function () {
        return client.isVisible(children, function (err, res) {
            return [].concat(res).filter(isTrue => isTrue);
        });
    };

    this.nthText = (nth) => client.getText(nthLabel(nth));

    this.waitNth = function (nth, expected) {
        return client.waitUntil(function () {
            return this.getText(nthLabel(nth)).then(function (actual) {
                return actual === expected;
            });
        }, config.waitTimeout);
    };

    this.mouseOverNth = function (nth) {
        client = client.moveToObject(nthChild(nth)).moveToObject(nthDestroyBtn(nth));
        return this;
    };

    this.deleteNth = (nth) => client = client.click(nthDestroyBtn(nth));

    this.done = (nth) => client = client.click(nthCheckbox(nth));

    this.doneAll = () => client = client.click(toggleAll);

    this.undo = (nth) => this.done(nth);

    this.undoAll = () => this.doneAll();

    this.nthCompleted = (nth) => client.isVisible(nthCompleted(nth));

    this.doubleClickNth = (nth) => client = client.moveToObject(nthLabel(nth)).doubleClick(nthLabel(nth));

    this.editNth = function (nth, todo) {
        client = client.addValue(nthInput(nth), todo);
        return this;
    };

    this.enterNth = (nth) => enterKey(nthInput(nth));

    this.filter = {
        all : () => show(''),
        pending : () => show('pending'),
        completed : () => show('completed')
    };

    this.first = () => this.nthText(1);
    this.mouseOverFirst = () => this.mouseOverNth(1);
    this.deleteFirst = () => this.deleteNth(1);
    this.doubleClickFirst = () => this.doubleClickNth(1);
    this.editFirst = (todo) => this.editNth(1, todo);
    this.enterFirst = () => this.enterNth(1);

}

module.exports = new TodoPage();
