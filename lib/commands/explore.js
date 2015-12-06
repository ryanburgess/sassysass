var fs = require('fs');
var https = require('https');
var request = require('request');
var path = require('path');
var prompt = require('prompt');
var dir = path.dirname();
var mixinsPath = 'sass/utils';
var availableMixins = [];

module.exports = function explore() {
  var options = {
    url: 'https://api.github.com/repositories/35896497/contents/utils/mixins',
    method: 'GET',
    headers: {
      'User-Agent': 'Super Agent/0.0.1',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  function startPrompt(json) {
    prompt.message = 'SassySass'.magenta;
    prompt.delimiter = ' ';

    prompt.start();

    prompt.get({
      properties: {
        mixinSelected: {
          description: 'What mixin would you like to install?\n'.red + json.map(function(name, index) { return index + '. ' + name; }).join('\n').white + '\n'
        }
      }
    },
    function (err, result) {
      if(err) {
        return console.log(err);
      }

      var mixinFile = availableMixins[result.mixinSelected];
      console.log(mixinFile);
      var file = fs.createWriteStream(dir + '/' + mixinsPath + '/mixins/' + mixinFile);
      var req = https.get('https://raw.githubusercontent.com/ryanburgess/sassysass/master/utils/mixins/' + mixinFile, function(response) {
        response.pipe(file);
        file.on('finish', function() {
          file.close(function (err) {
            if(err) {
              return console.log(err);
            }
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

  // API Github requests user agent
  console.log('Fetching mixins...\n\n'.red);
  request(options, function (error, response, body) {
    if (!error) {
      JSON.parse(body).forEach(function (e) {
        availableMixins.push(e.name);
      });
      startPrompt(availableMixins);
    }
  });
};

