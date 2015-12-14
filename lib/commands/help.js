var pkg = require('../../package.json');
var help = require('../../templates/json/help.json');
var version = pkg.version;
var commands;
var output = '';

output += '\nSassy Sass ' + version + '\n';
output += '\nUsage: ' + help.usage + '\n';
output += '\nCommands:\n';

commands = help.commands;
module.exports = function help() {
  for (var key in commands) {
    if (commands.hasOwnProperty(key)) {
      output += key + ' = ' + commands[key] + '\n';
    }
  }
  console.log(output);
};
