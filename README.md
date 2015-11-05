npm 2.14.2
node v4.0.0
phantomjs 1.9.8

rm -rf node_modules && npm install

rm -rf app/bower_components && bower install

cd it && rm -rf bower_components && bower install && cd ..

grunt serve

grunt mocha_casperjs
