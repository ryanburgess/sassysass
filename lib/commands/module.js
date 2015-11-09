#!/usr/bin/env node

var fs        = require('fs'),
  path        = require('path'),
  prompt      = require('prompt'),
  async       = require('async'),
  request     = require('request'),
  pkg         = require('../../package.json'),
  version     = pkg.version,
  dir         = path.dirname(),
  dateTime    = require('get-date'),
  write       = require('../write'),
  newFile     = '',
  pageBlock   = '',
  pages,
  name,
  overwrite,
  modulePath  = 'sass/modules',
  moduleDesc;

module.exports = function module() {
  // complete the creation of the new module
  function complete(){
    newFile += '// File Name: _' + name + '.scss'+ '\n';
    newFile += '// Description: ' + moduleDesc + '\n';
    newFile += '// Used by: '+ pageBlock +'\n';
    newFile += '// Dependencies: \n';
    newFile += '// Date created: ' + dateTime() + '\n';
    newFile += '// ------------------------------------------------------------\n';

    // check if file already exists
    fs.exists(dir + '/'+ modulePath +'/_' + name + '.scss', function (exists) {
      if(exists !== true){
        writeFile();
      }else{
        console.log('The module ' + name + ' already exists');
      }
    });
  }

  function writeFile(){
    fs.writeFile(dir + '/'+ modulePath +'/_' + name + '.scss', newFile, function(err) {
      if(err) {
        console.log(err);
        console.log('Directory path might be wrong');
      }else{
        console.log('_' + name + '.scss was created');
      }
      console.log('SassySass module ' + version);
    });
  }

  prompt.message = 'SassySass'.magenta;
  prompt.delimiter = ' ';

  prompt.start();

  prompt.get({
    properties: {
      name : {
        description: 'What is the name of the module?',
        conform: function(moduleName){
          return !fs.existsSync(dir + '/'+ modulePath +'/_' + moduleName + '.scss');
        },
        message : "Module already exists, please choose another name"
      },
      modulePath : {
        description: 'Path to modules directory?'
      },
      moduleDesc : {
        description: 'What is this module used for?'
      },
      pages : {
        description: 'What pages do you want to add this module to?'
      }
    }
  }, function (err, result) {
    name = result.name.replace(/\s+/g, '-');
    moduleDesc = result.moduleDesc;
    pages = result.pages;

    // if module name is left blank set to default module
    if(name === ''){
      name = 'module';
    }

    // if file path is left blank set to default sass/modules
    if(result.modulePath !== ''){
      modulePath = result.modulePath;
    }

    // add module to the list of pages provided
    if(pages !== ''){
      pages = pages.split(', ');

      async.forEach(pages, function (page, callback){ 

        pageBlock += page + '.scss, ';

        fs.exists(dir + '/sass/' + page + '.scss', function (exists) {
          if(exists === true){
            fs.readFile(path.join(dir + '/sass/' + page + '.scss'), 'utf8', function (err,data) {
              if (err) {
                return console.log(err);
              }
              var newModPath = modulePath.replace('sass/', '');
              var updateFile = data.replace('\n// ----------------------------------------------------------------------\n\t// Themes', '@import "'+ newModPath + '/' + name +'";\n\n// ----------------------------------------------------------------------\n\t// Themes');
              write(dir + '/sass/' + page + '.scss', updateFile);
            });
          }
        });

        callback();
      }, function(err) {
        complete();
      }); 
    }else{
      complete();
    }  
  });
};