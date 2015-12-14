var fs = require('fs');
var path = require('path');
var prompt = require('prompt');
var pkg = require('../../package.json');
var write = require('../write');
var version = pkg.version;
var dir = path.dirname();
var name;
var filePath = 'sass';
var modules;
var moduleBlock = '';

module.exports = function page() {
  prompt.message = 'SassySass'.magenta;
  prompt.delimiter = ' ';

  prompt.start();

  prompt.get({
    properties: {
      name: {
        description: 'What is the name of the page?',
        conform: function(fileName) {
          return !fs.existsSync(dir + '/' + filePath + '/' + fileName + '.scss');
        },
        message: 'Page already exists, please choose another name'
      },
      filePath: {
        description: 'Path to page directory?'
      },
      modules: {
        description: 'Add modules to page?'
      }
    }
  }, function (err, result) {
    name = result.name.replace(/\s+/g, '-');
    modules = result.modules;

    if (err) {
      return err;
    }

    // if page name is left blank set to default page
    if(name === '') {
      name = 'page';
    }

    // if file path is left blank leave to default sass
    if(result.filePath !== '') {
      filePath = result.filePath;
    }

    if(modules !== '') {
      modules = modules.split(', ');
      for (var i = 0; i < modules.length; i++) {
        moduleBlock += '@import "modules/' + modules[i] + '";\n';
      }
    }

    // check if file already exists
    fs.exists(dir + '/' + filePath + '/' + name + '.scss', function (exists) {

      if(exists !== true) {
        // create page specific
        fs.readFile(path.join(__dirname, '../../style.scss'), 'utf8', function (err,data) {
          if (err) {
            console.log('Directory path might be wrong');
            return console.log(err);
          }
          var newFile = data.replace('@import "themes/red";', '').replace('@import "modules/header";', '')
          .replace('@import "modules/footer";', moduleBlock);
          write(dir + '/' + filePath + '/' + name + '.scss', newFile);
        });

        console.log('SassySass page v' + version);
      }else{
        console.log('The page ' + name + ' already exists');
      }
    });
  });
};