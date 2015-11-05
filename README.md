### webdriverio it tests avec cucumberjs & mocha & chai

* npm 2.14.2
* node v4.0.0

rm -rf node_modules && npm install

rm -rf app/bower_components && bower install

cd it && rm -rf bower_components && bower install && cd ..

grunt serve

java -jar ~/dev/selenium/selenium-server-standalone-2.48.2.jar

#### it tests
grunt mochaTest
#### functional tests
grunt cucumberjs
