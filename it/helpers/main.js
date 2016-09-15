
global.todo = require('../page/todoPage');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

global.Q = require('q');
global.expect = chai.expect;
