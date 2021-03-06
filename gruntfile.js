'use strict';

module.exports = function(config) {

  config.initConfig({

    clean: ['build/'],

    copy: {
      copyhtml: {
        files: [
          {
            cwd: 'client/',
            src: '*.html',
            dest: 'build/',
            expand: true
          },
          {
            cwd: 'client/templates/',
            src: '*.template.html',
            dest: 'build/templates/',
            expand: true
          }
        ]
      },
      copyjs: {
        files: [
          {
            cwd: 'client/js/',
            src: '*.js',
            dest: 'build/js/',
            expand: true
          }
        ]
      },
      copyimg: {
        files: [
          {
            cwd: 'client/images/',
            src: '*.jpeg',
            dest: 'build/images/',
            expand: true
          }
        ]
      }
    },

    jshint: {
      appjs: {
        options: {
          jshintrc: '.jshintrc'
        },
        files: {
          src: ['client/js/**/*.js']
        }
      }
    },

    sass: {
      all: {
        files: {
          'build/style.css':'client/sass/main.scss'
        }
      }
    },

    watch: {
      scripts: {
        files: ['client/**/*.html', 'client/**/*.js', 'client/sass/**/*.scss'],
        tasks: ['build'],
        options: {
          spawn: false
        }
      }
    },

    karma: {
      all: {
        options: {
          frameworks: ['mocha', 'chai'],
          browsers: ['Chrome'],
          files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'node_modules/angular-ui-router/release/angular-ui-router.js',
            'client/js/map-out-hate.module.js',
            'client/js/**/*.js',
            'tests/**/*.spec.js'
          ],
          singleRun: true,
          preprocessors: {
            'client/js/**/*.js':['coverage']
          },
          reporters: ['dots', 'coverage'],
          coverageReporter: {
            type: 'text-summary'
          }
        }
      }
    },

    concat: {
      alljs: {
        options: {
          sourceMap: true
        },
        src: ['client/js/map-out-hate.module.js', 'client/js/**/*.js'],
        dest: 'build/js/app.js'
      }
    },

    babel: {
      all: {
        options: {
          presets: ['es2015'],
          sourceMap: true
        },
        files: {
          'build/js/app.js':'build/js/app.js'
        }
      }
    }
    
  });

  require('load-grunt-tasks')(config);

  config.registerTask('build', ['jshint', 'clean', 'copy', 'sass', 'concat', 'babel']);

};
