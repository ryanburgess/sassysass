var fs = require('fs-extra');
var path = require('path');
var pkg = require('../../package.json');
var write = require('../write');
var mkdir = require('../mkdir');
var version = pkg.version;
var dir = path.dirname();

module.exports = function install() {
  // check to make sure a sass directory doesn't exist already
  fs.exists(dir + '/sass', function (exists) {
    if(exists !== true) {
      mkdir(dir + '/sass', function() {
        mkdir(dir + '/sass/utils');
        mkdir(dir + '/sass/base');
        mkdir(dir + '/sass/layout');
        mkdir(dir + '/sass/modules');
        mkdir(dir + '/sass/themes');

        // create files
        write(dir + '/sass/base/_fonts.scss', '');
        write(dir + '/sass/layout/_grid.scss', '');
      });

      // copy the mixins directory and create a new mixins directory
      fs.copy(path.join(__dirname, '../../sass/utils/mixins'), dir + '/sass/utils/mixins', function(err) {
        if (err) {
          return console.log(err);
        }
      });

      // create page specific
      fs.readFile(path.join(__dirname, '../../sass/style.scss'), 'utf8', function (err, data) {
        if (err) {
          return console.log(err);
        }
        write(dir + '/sass/style.scss', data);
      });

      // create mixins
      fs.readFile(path.join(__dirname, '../../sass/utils/_mixins.scss'), 'utf8', function (err, data) {
        if (err) {
          return console.log(err);
        }
        write(dir + '/sass/utils/_mixins.scss', data);
      });

      // create extends
      fs.readFile(path.join(__dirname, '../../sass/utils/_extends.scss'), 'utf8', function (err, data) {
        if (err) {
          return console.log(err);
        }
        write(dir + '/sass/utils/_extends.scss', data);
      });

      // create reset
      fs.readFile(path.join(__dirname, '../../sass/base/_reset.scss'), 'utf8', function (err, data) {
        if (err) {
          return console.log(err);
        }
        write(dir + '/sass/base/_reset.scss', data);
      });

      // create variables
      fs.readFile(path.join(__dirname, '../../sass/base/_variables.scss'), 'utf8', function (err, data) {
        if (err) {
          return console.log(err);
        }
        write(dir + '/sass/base/_variables.scss', data);
      });

      console.log('SassySass v' + version);
    }else {
      console.log('A Sass directory already exists');
    }
  });
};