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
var newFile = '';
var pageBlock = '';
var pages;
var name;
var themePath = 'sass/themes';
var themeDesc;

module.exports = function theme() {

  function writeFile() {
    fs.writeFile(dir + '/' + themePath + '/_' + name + '.scss', newFile, function(err) {
      if(err) {
        console.log(err);
        console.log(strings.errors.directoryPath);
      }else {
        console.log('_' + name + '.scss was created');
      }
      console.log(strings.messages.themeVersion + version);
    });
  }

  // complete the creation of the new theme
  function complete() {
    newFile += '// File Name: _' + name + '.scss' + '\n';
    newFile += '// Description: ' + themeDesc + '\n';
    newFile += '// Used by: ' + pageBlock + '\n';
    newFile += '// Dependencies: \n';
    newFile += '// Date created: ' + dateTime() + '\n';
    newFile += '// SassySass v' + version + '\n';
    newFile += '// ------------------------------------------------------------\n';
    // check if file already exists
    fs.exists(dir + '/' + themePath + '/_' + name + '.scss', function (exists) {
      if(exists !== true) {
        writeFile();
      }else {
        console.log('The theme ' + name + ' already exists');
      }
    });
  }

  prompt.message = 'SassySass'.magenta;
  prompt.delimiter = ' ';

  prompt.start();

  prompt.get({
    properties: {
      name: {
        description: strings.questions.nameTheme,
        conform: function(themeName) {
          return !fs.existsSync(dir + '/' + themePath + '/_' + themeName + '.scss');
        },
        message: strings.errors.themeExists
      },
      themePath: {
        description: strings.questions.pathToTheme
      },
      themeDesc: {
        description: strings.questions.themeDesc
      },
      pages: {
        description: strings.questions.themeAddToPage
      }
    }
  }, function (err, result) {
    name = result.name.replace(/\s+/g, '-');
    themeDesc = result.themeDesc;
    pages = result.pages;

    if(err) {
      return err;
    }

    // if theme name is left blank set to default theme
    if(name === '') {
      name = 'theme';
    }

    // if file path is left blank set to default sass/themes
    if(result.themePath !== '') {
      themePath = result.themePath;
    }

    // add theme to the list of pages provided
    if(pages !== '') {
      pages = pages.split(', ');

      async.forEach(pages, function (page, callback) {

        pageBlock += page + '.scss, ';

        fs.exists(dir + '/sass/' + page + '.scss', function (exists) {
          if(exists === true) {
            var newThemePath = themePath.replace('sass/', '');
            fs.appendFile(dir + '/sass/' + page + '.scss', '\n@import "' + newThemePath + '/' + name + '";', function(err) {
              if (err) {
                return console.log(err);
              }
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