'use strict';

require('../../helpers/main');

module.exports = function () {

    function nthToPosition(nth) {
        return ['premier', 'deuxième', 'troisième'].indexOf(nth) + 1;
    }

    this.Before(function (callback) {
        todo.before().then(function () {
            callback();
        });
    });

    this.After(function (callback) {
        todo.after().then(function () {
            callback();
        });
    });

    this.Given(/(\d+) todos dans la liste/, function (nbTodos, callback) {
        var i;
        for (i = 1; i <= parseInt(nbTodos); i += 1) {
            todo.typeNew('todo ' + i).enterNew();
        }
        callback();
    });

    this.When(/je saisis le todo "(.*)"/, function (aTodo, callback) {
        todo.typeNew(aTodo).enterNew();
        callback();
    });

    this.Then(/le todo "(.*)" est placé en position (\d+) dans la liste/, function (aTodo, position, callback) {
        expect(todo.nthText(position)).to.eventually.equal(aTodo).notify(callback);
    });

    this.When(/je supprime le todo placé en position (\d+) dans la liste/, function (position, callback) {
        todo.mouseOverNth(position).deleteNth(position);
        callback();
    });

    this.Then(/la liste contient (\d+) todo\(s\)/, function (nbTodos, callback) {
        expect(todo.nbVisible()).to.eventually.have.length(parseInt(nbTodos)).notify(callback);
    });

    this.When(/je coche le "(premier|deuxième|troisième)" todo/, function (nth, callback) {
        todo.done(nthToPosition(nth));
        callback();
    });

    this.When(/je décoche le "(premier|deuxième|troisième)" todo/, function (nth, callback) {
        todo.undo(nthToPosition(nth));
        callback();
    });

    this.When(/je coche tous les todos/, function (callback) {
        todo.doneAll();
        callback();
    });

    this.When(/je décoche tous les todos/, function (callback) {
        todo.undoAll();
        callback();
    });

    this.Then(/le "(premier|deuxième|troisième)" todo est fait/, function (nth, callback) {
        expect(todo.nthCompleted(nthToPosition(nth))).to.eventually.be.true.notify(callback);
    });

    this.Then(/le "(premier|deuxième|troisième)" todo est à faire/, function (nth, callback) {
        expect(todo.nthCompleted(nthToPosition(nth))).to.eventually.be.false.notify(callback);
    });

    this.When(/j'édite le "(premier|deuxième|troisième)" todo avec la valeur "(.*)"/, function (nth, valeur, callback) {
        var position = nthToPosition(nth);
        todo.doubleClickNth(position);
        todo.editNth(position,valeur).enterNth(position);
        callback();
    });

    this.When(/je filtre les todos faits/, function (callback) {
        todo.filter.completed();
        callback();
    });

    this.When(/je filtre les todos à faire/, function (callback) {
        todo.filter.pending();
        callback();
    });

    this.When(/je montre tous les todos/, function (callback) {
        todo.filter.all();
        callback();
    });

};
