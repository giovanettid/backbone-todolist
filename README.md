### webdriverio it tests avec cucumberjs & mocha & chai

* npm 2.14.2
* node v4.0.0

rm -rf node_modules && npm install

rm -rf app/bower_components && bower install

grunt serve

java -jar ~/dev/selenium/selenium-server-standalone-2.53.0.jar

#### unit tests
grunt mochaTest:test
#### it tests
grunt mochaTest:it
#### unit + it tests
grunt mochaTest
#### functional tests
grunt cucumberjs
