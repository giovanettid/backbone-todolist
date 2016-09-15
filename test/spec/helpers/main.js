const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

global.sinon = sinon;
global.expect = chai.expect;

const jsdom = require('jsdom');
const fs = require('fs');
const markup = fs.readFileSync('app/index.html');

global.window = jsdom.jsdom(markup).defaultView;

const requirejs = require('requirejs');
global.requirejs = requirejs;

const require_helper = function (path) {
    'use strict';
    return (process.env.APP_DIR_FOR_CODE_COVERAGE || '../app/scripts/') + path;
};

requirejs.config({
    baseUrl: 'test',
    map: {
        '*': {'collections/store': 'storageMock'}
    },
    paths: {
        jquery: '../node_modules/jquery/dist/jquery',
        underscore: '../app/bower_components/lodash/dist/lodash.compat',
        backbone: '../app/bower_components/backbone/backbone',
        'backbone.radio': '../app/bower_components/backbone.radio/build/backbone.radio',
        marionette: '../app/bower_components/marionette/lib/backbone.marionette',
        'common': require_helper('common'),
        'models/todo': require_helper('models/todo'),
        'collections/todos': require_helper('collections/todos'),
        'events/filterChannel': require_helper('events/filterChannel'),
        'views/todoView': require_helper('views/todoView'),
        'views/headerView': require_helper('views/headerView'),
        'views/listView': require_helper('views/listView'),
        'views/footerView': require_helper('views/footerView'),
        'views/layoutView': require_helper('views/layoutView')
    }
});

requirejs.define(
    'storageMock',
    function () {
        'use strict';
        return null;
    }
);


