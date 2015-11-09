var fs      = require('fs'),
  path      = require('path'),
  request   = require('request'),
  dir       = path.dirname(),
  pkg       = require('../../package.json'),
  help      = require('../../templates/json/help.json'),
  version   = pkg.version,
  commands,
  output    = '';

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
