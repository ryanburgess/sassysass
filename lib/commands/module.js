#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var prompt = require('prompt');
var async = require('async');
var pkg = require('../../package.json');
var strings = require('../../templates/json/strings.json');
var version = pkg.version;
var dir = path.dirname();
var dateTime = require('get-date');
var write = require('../write');
var newFile = '';
var pageBlock = '';
var pages;
var name;
var modulePath = 'sass/modules';
var moduleDesc;

module.exports = function module() {

  function writeFile() {
    fs.writeFile(dir + '/' + modulePath + '/_' + name + '.scss', newFile, function(err) {
      if(err) {
        console.log(err);
        console.log(strings.directoryPath);
      }else {
        console.log('_' + name + '.scss was created');
      }
      console.log(strings.moduleVersion + version);
    });
  }

  // complete the creation of the new module
  function complete() {
    newFile += '// File Name: _' + name + '.scss' + '\n';
    newFile += '// Description: ' + moduleDesc + '\n';
    newFile += '// Used by: ' + pageBlock + '\n';
    newFile += '// Dependencies: \n';
    newFile += '// Date created: ' + dateTime() + '\n';
    newFile += '// SassySass v' + version + '\n';
    newFile += '// ------------------------------------------------------------\n';

    // check if file already exists
    fs.exists(dir + '/' + modulePath + '/_' + name + '.scss', function (exists) {
      if(exists !== true) {
        writeFile();
      }else {
        console.log('The module ' + name + ' already exists');
      }
    });
  }

  prompt.message = 'SassySass'.magenta;
  prompt.delimiter = ' ';

  prompt.start();

  prompt.get({
    properties: {
      name: {
        description: strings.nameModule,
        conform: function(moduleName) {
          return !fs.existsSync(dir + '/' + modulePath + '/_' + moduleName + '.scss');
        },
        message: strings.moduleExists
      },
      modulePath: {
        description: strings.pathToModule
      },
      moduleDesc: {
        description: strings.moduleDesc
      },
      pages: {
        description: strings.moduleAddToPage
      }
    }
  }, function (err, result) {
    name = result.name.replace(/\s+/g, '-');
    moduleDesc = result.moduleDesc;
    pages = result.pages;

    if(err) {
      return err;
    }

    // if module name is left blank set to default module
    if(name === '') {
      name = 'module';
    }

    // if file path is left blank set to default sass/modules
    if(result.modulePath !== '') {
      modulePath = result.modulePath;
    }

    // add module to the list of pages provided
    if(pages !== '') {
      pages = pages.split(', ');

      async.forEach(pages, function (page, callback) {

        pageBlock += page + '.scss, ';

        fs.exists(dir + '/sass/' + page + '.scss', function (exists) {
          if(exists === true) {
            fs.readFile(path.join(dir + '/sass/' + page + '.scss'), 'utf8', function (err, data) {
              if (err) {
                return console.log(err);
              }
              var newModPath = modulePath.replace('sass/', '');
              var updateFile = data.replace('\n// ----------------------------------------------------------------------\n\t// Themes',
                '@import "' + newModPath + '/' + name + '";\n\n// ----------------------------------------------------------------------\n\t// Themes');
              write(dir + '/sass/' + page + '.scss', updateFile);
            });
          }
        });

        callback();
      }, function(err) {
        if(err) {
          return err;
        }
        complete();
      });
    }else {
      complete();
    }
  });
};