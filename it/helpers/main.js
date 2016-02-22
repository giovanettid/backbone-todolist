
global.todo = require("../page/todoPage");

var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

global.Q = require("q");
global.expect = chai.expect;
