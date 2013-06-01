module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      js: {
        files: {
          '../build/js/plugins.js': ['static/js/plugins.js'],
          '../build/js/main.js': ['static/js/main.js']
        }
      }
    },
    compass: {                  // Task
      dist: {                   // Target
        options: {              // Target options
          sassDir: 'sass/',
          cssDir: '../build/css',
        }
      }
    },
    mincss : {
      compress : {
        files : {
          "../build/css/boilerplate.min.css" : ['static/css/boilerplate.css'],
          "../build/css/normalize.min.css" : ['static/css/normalize.css'],
          "../build/css/main.min.css" : ['../build/css/main.css']
          }
        }
    },
    clean :["../build/css/main.css","../build/css/normalize.css"],
    htmlmin: {                                     // Task
      dist: {                                      // Target
        options: {                                 // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        files: {                                   // Dictionary of files
          '../build/html/index.html': 'static/html/index.html',     // 'destination': 'source
          '../build/html/login.html': 'static/html/login.html'
        }
      }
    },
    copy:{
      main: {
        files: [
          {src: ['static/img/*'], cwd: './', dest: 'build/img/', filter: 'isFile'}
        ]
      }
    }, 
    watch: {
      html:{
        files: ['static/**/html/*.html'],
        tasks: 'html'
      },
      js:{
        files: ['static/js/*.js'],
        tasks: 'js'
      },
      sass:{
        files: ['sass/**/*.scss'],
        tasks: 'sass'
      },
      css:{
        files: ['static/css/*.css'],
        tasks: 'sass'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-mincss');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('html', [ 'htmlmin']);
  grunt.registerTask('js', [ 'uglify']);
  grunt.registerTask('sass', [ 'compass','mincss']);
  grunt.registerTask('build', [ 'htmlmin','compass','mincss','uglify']);
};