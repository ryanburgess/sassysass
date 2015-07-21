var fs            = require('fs'),
    write         = require('../write'),
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
    startPrompt();
  });

  function startPrompt(){

    prompt.start();

    prompt.message = 'SassySass'.magenta;
    prompt.delimiter = ' ';

    prompt.get({
      properties: {
        section : {
          description: 'Choose Section for New Mixin:\n'.red + mixinSection.map(function(section,index){ return index+'. '+section }).join('\n').white + '\n'
        },
        mixinName : {
          description: 'Enter a Name for New Mixin:'.red
        }
      }
    }, function (err, result) {
      //create new mixin file
      //need to validation to check for existing mixin file
      //write(dir + '/'+ mixinsPath +'/mixins/'+'_'+result.mixinName.replace(/\s+/g, '-').toLowerCase()+'.scss','test');
      addImportStatement(mixinSection[parseInt(result.section)]);
    });

  }

  function addImportStatement(section){

    var instream = fs.createReadStream(dir + '/'+ mixinsPath +'/_mixins.scss');

    var rl = readline.createInterface({
        input: instream,
        terminal: false
    });

    var lineNum = 0;

    rl.on('line', function(line) {
      lineNum++;
      if(line.indexOf(section) > -1){
        console.log(lineNum);
      }
    });

    rl.on('close',function() {
      //
    });    

  }

};
