var fs = require('fs');
var path = require('path');
var prompt = require('prompt');
var pkg = require('../../package.json');
var strings = require('../../templates/json/strings.json');
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
        description: strings.questions.namePage,
        conform: function(fileName) {
          return !fs.existsSync(dir + '/' + filePath + '/' + fileName + '.scss');
        },
        message: strings.errors.pageExists
      },
      filePath: {
        description: strings.questions.pathToPage
      },
      modules: {
        description: strings.questions.addModules
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
        fs.readFile(path.join(__dirname, '../../sass/style.scss'), 'utf8', function (err, data) {
          if (err) {
            console.log(strings.errros.directoryPath);
            return console.log(err);
          }
          var newFile = data.replace('@import "themes/red";', '').replace('@import "modules/header";', '')
          .replace('@import "modules/footer";', moduleBlock);
          write(dir + '/' + filePath + '/' + name + '.scss', newFile);
        });

        console.log(strings.messages.pageVersion + version);
      }else {
        console.log('The page ' + name + ' already exists');
      }
    });
  });
};