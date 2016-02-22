var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

global.sinon = sinon;
global.expect = chai.expect;

var jsdom = require('jsdom');
var fs = require("fs");
var markup = fs.readFileSync('app/index.html');

global.window = jsdom.jsdom(markup).defaultView;

global.requirejs = require('requirejs');

requirejs.config({
    baseUrl: 'test',
    map: {
        '*': {'collections/store': 'storageMock'}
    },
    paths: {
        jquery: '../node_modules/jquery/dist/jquery',
        underscore: '../app/bower_components/underscore/underscore',
        backbone: '../app/bower_components/backbone/backbone',
        'common': '../app/scripts/common',
        'models/todo': '../app/scripts/models/todo',
        'collections/todos': '../app/scripts/collections/todos',
        'views/todoView': '../app/scripts/views/todoView',
        'views/appView': '../app/scripts/views/appView'
    }
});

requirejs.define(
    'storageMock', function() {
        return null;
    });
