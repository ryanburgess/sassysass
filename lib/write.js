var fs    = require('fs'),
  path    = require('path');
// create new file
module.exports = function write(path, str, mode) {
  fs.writeFileSync(path, str, { mode: mode || 0666 });
  console.log('   \x1b[36mupdate\x1b[0m : ' + path);
};