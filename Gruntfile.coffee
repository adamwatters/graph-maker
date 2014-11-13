module.exports = (grunt) ->
  # Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch:
      coffee:
        files: ["src/app.coffee"]
        tasks: 'coffee'

    coffee:
      compile:
        options:
          bare: true
          sourceMap: true

        files:
          "public/app.js": ['src/app.coffee']
  });

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.registerTask 'default', ['coffee']
