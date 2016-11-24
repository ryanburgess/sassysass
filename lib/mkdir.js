const mkdirp = require('mkdirp');
const path = require('path');

// make a directory
module.exports = function mkdir(path, fn) {
  mkdirp(path, 0755, function(err) {
    if (err) throw err;
    console.log('   \033[36mcreate\033[0m : ' + path);
    return fn && fn();
  });
};
