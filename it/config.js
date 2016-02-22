
var config = {};

config.waitTimeout = 2000;

config.browser = 'chrome';
//config.browser = 'phantomjs';

config.url = 'http://localhost:9000';
//config.url = 'http://192.168.99.100:9000';

var options = {};

options.local = {
    desiredCapabilities: {
        browserName: config.browser
    }
};

options.docker = {
    desiredCapabilities: {
        browserName: config.browser
    },
    host: '192.168.99.100',
    port: 4444
};

options.browserstack = {
    desiredCapabilities: {
        'browser': 'chrome',
        'browser_version': '46.0',
        'os': 'Windows',
        'os_version': '7',
        //'os' : 'OS X',
        //'os_version' : 'El Capitan',
        'browserstack.debug': 'true',
        'browserstack.local': 'true',
        'browserstack.video': 'false',
        'browserstack.user': '<user>',
        'browserstack.key': '<key>'
    },
    host: 'hub.browserstack.com',
    port: 4444
};

options.saucelabs = {
    desiredCapabilities: {
        browserName: config.browser,
        platform: 'Windows 7',
        //'platform': 'OS X 10.11',
        version: '46.0',
        'record-video': 'false',
        'record-screenshots' : 'false'
    },
    user: '<user>',
    key: '<key>'
};

//config.options = options.docker;
config.options = options.local;

module.exports = config;
