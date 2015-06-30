var fs    = require('fs'),
  path    = require('path'),
  dir     = path.dirname(),
  write   = require('../lib/write');

exports.writeTest = function(test){
  var writeFunction = write(dir + '/sass/test.scss', 'test');
  test.notEqual(writeFunction, undefined);
  test.done();
};
