var fs            = require('fs'),
    readline      = require('readline'),
    path          = require('path'),
    prompt        = require('prompt'),
    async         = require('async'),
    pkg           = require('../../package.json'),
    version       = pkg.version,
    dir           = path.dirname(),
    dateTime      = require('get-date'),
    mixinsPath    = 'sass/utils';
    mixinSection  = [];

module.exports = function mixin() {

  var instream = fs.createReadStream(dir + '/'+ mixinsPath +'/_mixins.scss');

  var rl = readline.createInterface({
      input: instream,
      terminal: false
  });

  rl.on('line', function(line) {
    var result = line.match(/\s\s\/\/\s(\w+)(\s)?(\w+)/g); // matches space space // space NAME
    if(result !== null){
      mixinSection.push(result[0].replace('  // ','')); //strip leading slashes
    }
  });

  rl.on('close',function() {
    mixinSection.push('*Add New Section*');
    mixinSection = mixinSection.map(function(section,index){
      return index+'. '+section;
    });
    startPrompt();
  });

  function startPrompt(){
    
    prompt.start();

    prompt.message = 'SassySass'.magenta;
    prompt.delimiter = ' ';

    prompt.get({
      properties: {
        section : {
          description: 'Choose Section For New Mixin:\n'.red + mixinSection.join('\n').white + '\n'
        }
      }
    }, function (err, result) {
      console.log(result);
    });

  }
};
