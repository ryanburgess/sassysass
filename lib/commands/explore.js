var fs              = require('fs'),
    https            = require('https'),
    request         = require('request'),
    write           = require('../write'),
    path            = require('path'),
    prompt          = require('prompt'),
    pkg             = require('../../package.json'),
    version         = pkg.version,
    dir             = path.dirname(),
    mixinsPath      = 'sass/utils',
    availableMixins = [];

module.exports = function explore() {
  var options = {
    url: 'https://api.github.com/repositories/35896497/contents/utils/mixins',
    method: 'GET',
    headers: {
      'User-Agent':   'Super Agent/0.0.1',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  // API Github requests user agent
  console.log('Fetching mixins...\n\n'.red);
  request(options, function (error, response, body) {
    if (!error) {
      JSON.parse(body).forEach(function(e,i,a) {
        availableMixins.push(e.name);
      });
      startPrompt(availableMixins);
    }
  });

  function startPrompt(json) {
    prompt.message = 'SassySass'.magenta;
    prompt.delimiter = ' ';

    prompt.start();

    prompt.get({
      properties: {
        mixinSelected : {
          description: 'What mixin would you like to install?\n'.red + json.map(function(name, index) { return index + '. ' + name; }).join('\n').white + '\n'
        }
      }
    }, function (err, result) {
      var mixinFile = availableMixins[result.mixinSelected];
      console.log(mixinFile);
      var file = fs.createWriteStream(dir + '/' + mixinsPath + '/mixins/' + mixinFile);
      var req = https.get('https://raw.githubusercontent.com/ryanburgess/sassysass/master/utils/mixins/' + mixinFile, function(response) {
        response.pipe(file);
        file.on('finish', function() {
          file.close(function(err) {
            fs.appendFile(dir + '/' + mixinsPath + '/_mixins.scss', '@import \"mixins/' + mixinFile.substr(1).split('.scss')[0] + '\";\n', function (err) {
              if (err) {
                console.log(err);
              }
            });
            console.log('\n Mixin ' + mixinFile + ' successfully added.'.magenta);
          });  // close() is async, call cb after close completes.
        });
      }).on('error', function(err) { // Handle errors
        fs.unlink(dir + mixinsPath); // Delete the file async. (But we don't check the result)
        console.log(err);
      });
    });
  }
};

