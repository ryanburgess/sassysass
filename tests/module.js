'use strict';
var test = require('tape');
var module = require('../bin/sassysass-module');

test('Check if module is not undefined', function (t) {
  t.assert(module !== undefined);
  t.end();
});

// test('Test regions', function (t) {
//   t.assert(isRegion('US') === 'NA');
//   t.assert(isRegion('TW') === 'APAC');
//   t.assert(isRegion('CO') === 'CA');
//   t.assert(isRegion('BE') === 'EMEA');
//   t.assert(isRegion('GE') !== 'NA');
//   t.assert(isRegion('CA') !== 'CA');
//   t.assert(isRegion('TH') !== 'EU');
//   t.end();
// });