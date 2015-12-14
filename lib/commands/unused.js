var fs = require('fs-extra');
var path = require('path');
var prompt = require('prompt');
var dir = path.dirname();
var fileArr = [];
var ouput = '';

function findFiles(type) {
  var files = fs.readdirSync(dir + '/sass/');
  var num = 0;
  for (var i in files) {
    if(files[i].indexOf('.scss') !== -1) {
      var name = files[i];

      fs.readFile(dir + '/sass/' + name, 'utf8', function(err, data) {
        if (err) {
          return err;
        }

        // loop through the unused files array
        fileArr.forEach(function(entry) {
          if(data.indexOf('@import "' + type + '/' + entry + '";') === -1) {
            ouput += '_' + entry + '.scss\n';
            num++;
          }
        });
        console.log('\nSassy Sass: there is currently ' + num + ' unused ' + type + '\n');
        console.log(ouput);

        // prompt to ask if unused files should be deleted
        if(num >= 1) {
          prompt.message = 'SassySass'.magenta;
          prompt.delimiter = ' ';
          prompt.start();
          prompt.get({
            properties: {
              answer: {
                description: 'Do you want to delete unused ' + type + '? (yes/no)'
              }
            }
          }, function (err, result) {
            if (err) {
              return err;
            }

            // if user responds yes files will then be deleted
            if(result.answer === 'yes') {
              // loop through the unused files array
              fileArr.forEach(function(entry) {
                // unlink each unused file
                fs.unlink(dir + '/sass/' + type + '/_' + entry + '.scss', function (err) {
                  if (err) { throw err; }
                });
              });
              console.log('Unused ' + type + ' have been deleted');
            }
          });
        }
      });
    }
  }
}

module.exports = function unused(type) {
  if(type === 'modules' || type === 'layout' || type === 'themes') {
    var files = fs.readdirSync(dir + '/sass/' + type);
    for (var i in files) {
      if(files[i].indexOf('.scss') !== -1) {
        var name = files[i];
        name = name.replace('_', '').replace('.scss', '');
        // push unused files to an array
        fileArr.push(name);
      }
    }
    findFiles(type);
  }else {
    console.log('\nNot a command. Try sassysass unused <modules, themes, layout>\n');
  }
};
