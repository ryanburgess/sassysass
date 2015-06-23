var exec = require('child_process').exec;
exports.helpReturns = function(test){
  exec(['sassysass-help'], function (error, stdout, stderr) {
    test.notEqual(stdout, '');
    test.done();
  });
};