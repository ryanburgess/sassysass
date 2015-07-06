var fs    = require('fs-extra'),
  path    = require('path'),
  dir     = path.dirname(),
  fileArr = [],
  ouput = '';

module.exports = function unused(type) {
  if(type === 'modules' || type === 'layout' || type === 'themes'){
    var files = fs.readdirSync(dir + '/sass/' + type);
    for (var i in files) {
      if(files[i].indexOf('.scss') != -1){
        var name = files[i];
        name = name.replace('_', '').replace('.scss', '');
        fileArr.push(name);
      }
    }
    findFiles(type);
  }else{
    console.log('\nNot a command. Try sassysass unused <modules, themes, layout>\n');
  }
};

function findFiles(type){
  var files = fs.readdirSync(dir + '/sass/');
  var num = 0;
  for (var i in files) {
    if(files[i].indexOf('.scss') != -1){
      var name = files[i];
      var fileName = name.replace('_', '').replace('.scss', '');
      fs.readFile(dir + '/sass/' + name, 'utf8', function (err, data) {
        if (err) {
          return err;
        }

        fileArr.forEach(function(entry) {
          if(data.indexOf('@import "' + type + '/' + entry + '";') === -1){
            ouput += '_' + entry + '.scss\n';
            num++;
          }
        });
        console.log('\nSassy Sass: there is currently ' + num + ' unused ' + type + ':\n');
        console.log(ouput);
      });
    }
  }
}