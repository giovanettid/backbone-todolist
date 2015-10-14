
var todo = require("./page/todoPage");

var chai = require("./bower_components/chai/chai");
var chaiAsPromised = require("./bower_components/chai-as-promised/lib/chai-as-promised");
chai.use(chaiAsPromised);
var Q = require("./bower_components/q/q");

var main = {};

main.todo = todo;
main.expect = chai.expect;
main.Q = Q;

module.exports = main;
