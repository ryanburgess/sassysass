'use strict';
var test = require('tape');
var show = require('../lib/commands/show');

test('Test show function', function (t) {
  t.equal(show(), undefined, 'Not a command. Try sassysass show <modules, themes, layout, mixins>');
  t.equal(show('modules'), undefined, 'Sassy Sass: there is currently 0 modules:');
  //t.equal(show('mixins'), undefined, 'Pass - Show mixins working');
  t.end();
});