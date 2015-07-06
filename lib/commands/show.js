var fs    = require('fs-extra'),
  path    = require('path'),
  dir     = path.dirname();

module.exports = function show(type) {
  var files;
  var num = 0;
  var correct = true;
  if (type === 'pages') {
    files = fs.readdirSync(dir + '/sass/');
  }else if(type === 'modules' || type === 'themes' || type === 'layout'){
    files = fs.readdirSync(dir + '/sass/' + type);
  }else if(type === 'mixins'){
    files = fs.readdirSync(dir + '/sass/utils/' + type);
  }else{
    correct = false;
    console.log('\nNot a command. Try sassysass show <modules, themes, layout, mixins>\n');
  }
  if(correct === true){
    console.log('\n');
    for (var i in files) {
      if(files[i].indexOf('.scss') > -1){
        num++;
        console.log(files[i]);
      }
    }
    console.log('\nSassy Sass: there is currently ' + num + ' ' + type + '\n');
  }
};