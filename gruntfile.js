module.exports = function(grunt) {
  grunt.initConfig({
    nodeunit: {
      all: ['tests/**/*.js']
    },
    jshint: {
      all: ['bin/*']
    },
    jsonlint: {
      all: ['templates/json/**/*.json', 'package.json']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-jsonlint');

  grunt.registerTask('test', ['jshint', 'jsonlint', 'nodeunit']);
};