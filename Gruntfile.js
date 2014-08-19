module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean : {
      dev : {
        src : ['build/'] // like to use 'build' for development, but 'dist' for production
      }
    },

    // grunt-contrib-copy
    copy : {
      dev : {
        expand: true, // recursively copy from all directories
        cwd : 'app/', // current working diretory
        src : ['*.html', '*.css'],
        dest : 'build/',
        filter: 'isFile',
      }
    },

        // grunt-browserify
    browserify : {
      dev : {
        options : { // place options inside of dev to keep separate from production settings
          transform : ['debowerify'],
          debug: true
        },
        src : ['app/js/**/*.js'],
        dest: 'build/bundle.js'
      }
    }


  });

  grunt.registerTask('build:dev', ['clean:dev', 'browserify:dev', 'copy:dev']);

};
