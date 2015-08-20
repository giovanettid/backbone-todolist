require.config({
  shim: {

  },
  paths: {
    backbone: "../bower_components/backbone/backbone",
    "backbone.localstorage": "../bower_components/backbone.localstorage/backbone.localStorage",
    jquery: "../bower_components/jquery/dist/jquery",
    lodash: "../bower_components/lodash/dist/lodash.compat",
    modernizr: "../bower_components/modernizr/modernizr",
    requirejs: "../bower_components/requirejs/require",
    "todomvc-common": "../bower_components/todomvc-common/base",
    underscore: "../bower_components/underscore/underscore"
  },
  packages: [

  ]
});

require(['main']);
