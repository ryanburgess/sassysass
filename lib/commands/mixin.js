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

  function startPrompt() {

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
      var mixinFileName = result.mixinName.replace(/\s+/g, '-').toLowerCase();
      write(dir + '/'+ mixinsPath +'/mixins/'+'_'+mixinFileName+'.scss','');
      addImportStatement(mixinSection[parseInt(result.section)],mixinFileName);
    });

  }

  function addImportStatement(section,mixinFileName) {

    var instream = fs.createReadStream(dir + '/'+ mixinsPath +'/_mixins.scss');

    var rl = readline.createInterface({
        input: instream,
        terminal: false
    });

    //silly logic to find line to insert @import statement
    var sectionLineNum    = 0;
    var emptyLineCounter  = 0;
    var foundEmptyLine    = false;
    var foundSection      = false;

    rl.on('line', function(line) {

      if(!foundSection){
        sectionLineNum++;
      }
      if(foundSection){
        if(!foundEmptyLine){
          sectionLineNum++;
        }
        if(line == ''){
          emptyLineCounter++;
        }
        if(emptyLineCounter == 2){
          foundEmptyLine = true;
        }
      }
      if(line.indexOf(section) > -1){
        foundSection = true;
      }
      
    });

    rl.on('close',function() {

      //write @import statement
      var data = fs.readFileSync(dir + '/'+ mixinsPath +'/_mixins.scss').toString().split("\n");
      data.splice(sectionLineNum-1, 0, '@import "mixins/'+mixinFileName+'";');
      var text = data.join("\n");
      fs.writeFile(dir + '/'+ mixinsPath +'/_mixins.scss', text, function (err) {
        if (err) return console.log(err);
      });

      console.log('\nSassySass mixin ' + mixinFileName + ' was successfully created.\n');
    });    

  }

};
