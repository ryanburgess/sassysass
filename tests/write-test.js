'use strict';
var test = require('tape');
var write = require('../lib/write');

test('Test write function', function (t) {
  t.notEqual(write('test', 'test'), undefined, 'Pass - Write function working');
  t.end();
});
