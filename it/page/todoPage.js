
var config = require('../config');
var _ = require('../bower_components/underscore/underscore');

var webdriver = require('selenium-webdriver');
var By = require('selenium-webdriver').By;

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

    var find = function(selector) {
        return driver.findElement(By.css(selector));
    };

    var enterKey = function(selector) {
        find(selector).sendKeys(webdriver.Key.ENTER);
    };

    var nthLabel = _.partial(nthChildAndSelector,' label');
    var nthInput = _.partial(nthChildAndSelector,' input.edit');
    var nthDestroyBtn = _.partial(nthChildAndSelector,' button.destroy');
    var nthCheckbox = _.partial(nthChildAndSelector,' input.toggle');
    var nthCompleted = _.partial(nthChildAndSelector,'.completed');
    var nthHidden = _.partial(nthChildAndSelector,'.hidden');
    var nthNotHidden = _.partial(nthChildAndSelector,':not(.hidden)');

    var driver;

    var capabilities = {
        chrome: webdriver.Capabilities.chrome(),
        phantomjs: webdriver.Capabilities.phantomjs()
    };

    this.before = function() {
        driver = new webdriver.Builder()
            .withCapabilities(capabilities[config.browser]).build();
        driver.get(config.url);
        driver.executeScript('window.localStorage.clear();');
        return driver.navigate().refresh();
    };

    this.after = function() {
        return driver.quit();
    };

    this.title = function() {
        return driver.getTitle();
    };

    this.titleList = function() {
        return find(titleList).getText();
    };

    this.typeNew = function(newTodo) {
        find(idNew).sendKeys(newTodo);
        return this;
    };

    this.enterNew = function() {
        enterKey(idNew);
    };

    this.nbVisible = function() {
        return webdriver.promise.filter(driver.findElements(By.css(childrenVisible)), function(element) {
                return element.isDisplayed();
            });
    };

    this.nthText = function(nth) {
        return find(nthLabel(nth)).getText();
    };

    this.mouseOverNth = function(nth) {
        new webdriver.ActionSequence(driver).mouseMove(find(nthChild(nth))).perform();
        return this;
    };

    this.deleteNth = function(nth) {
        find(nthDestroyBtn(nth)).click();
    };

    this.done = function(nth) {
        find(nthCheckbox(nth)).click();
    };

    this.doneAll = function() {
        find(toggleAll).click();
    };

    this.undo = function(nth) {
        this.done(nth);
    };

    this.undoAll = function() {
        this.doneAll();
    };

    this.nthCompleted = function(nth) {
        return driver.findElements(By.css(nthCompleted(nth))).then(function (elements) {
            return _.isArray(elements) && elements.length === 1;
        });
    };

    this.doubleClickNth = function(nth) {
        new webdriver.ActionSequence(driver).mouseMove(find(nthLabel(nth))).doubleClick().perform();
    };

    this.editNth = function(nth,todo) {
        find(nthInput(nth)).sendKeys(todo);
        return this;
    };

    this.enterNth = function(nth) {
        enterKey(nthInput(nth));
    };

    this.show = function(label) {
        driver.findElement(By.linkText(label)).click();
    };

    this.first = _.partial(this.nthText,1);
    this.mouseOverFirst = _.partial(this.mouseOverNth,1);
    this.deleteFirst = _.partial(this.deleteNth,1);
    this.doubleClickFirst = _.partial(this.doubleClickNth,1);
    this.editFirst = _.partial(this.editNth,1);
    this.enterFirst = _.partial(this.enterNth,1);

}

module.exports = new TodoPage();
