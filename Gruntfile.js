module.exports = function(grunt) {

  var config = {};

  config.clean = {
    dist: [ 'dist/'],
  };

  config.copy = { bower_components: { files: [
        {
          expand: true,
          cwd: 'bower_components/bootstrap/dist/css',
          src: '*min.css',
          dest: 'dist/css/',
          flatten: true,
          filter: 'isFile'
        },
        {
          expand: true,
          cwd: 'bower_components/bootstrap/dist/js',
          src: '*min.js',
          dest: 'dist/js/',
          flatten: true,
          filter: 'isFile'
        },
        {
          expand: true,
          cwd: 'bower_components/bootstrap/dist/fonts',
          src: '*',
          dest: 'dist/fonts/',
          flatten: true,
          filter: 'isFile'
        },
        {
          expand: true,
          cwd: 'bower_components/jquery/dist',
          src: '*min.*',
          dest: 'dist/js/',
          flatten: true,
          filter: 'isFile'
        }
      ]
    },
    js: {
      files: [
        {
          expand: true,
          cwd: 'src/js',
          src: '*.js',
          dest: 'dist/js/',
          flatten: true,
          filter: 'isFile'
        }
      ]
    },
    manifest: {
      files: [
        {
          expand: true,
          cwd: 'src',
          src: 'manifest.json',
          dest: 'dist/',
          flatten: true,
          filter: 'isFile'
        }
      ]
    },
    images: {
      files: [
        {
          expand: true,
          cwd: 'src/images',
          src: '*.png',
          dest: 'dist/images/',
          flatten: true,
          filter: 'isFile'
        }
      ]
    }
  };

  config.jade = {
    dev: {
      options: {
        pretty: true
      },
      files: {
        "dist/popup.html": ["src/jade/popup.jade"],
        "dist/options.html": ["src/jade/options.jade"]
      }
    }
  };

  config.jshint = {
    dev: {
      options: {
        enforceall: true,
        nocomma: false,
        browser: true,
        jquery: true,
        globals: {
          'chrome': true,
        }
      },
      src: [
        'src/js/*.js'
      ]
    }
  };

  config.watch = {
    jslint : {
      files: ['src/js/*.js'],
      tasks: ['jshint:dev', 'copy:js']
    },
    jade: {
      files: ['src/jade/*.jade'],
      tasks: ['jade:dev']
    },
    manifest: {
      files: ['src/manifest.json'],
      tasks: ['copy:manifest']
    }
  };

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig(config);

  grunt.registerTask( 'dev', [
    'jshint:dev',
    'clean:dist',
    'copy:manifest',
    'copy:bower_components',
    'copy:js',
    'copy:images',
    'jade:dev'
  ]);
  grunt.registerTask( 'release', ['clean:dist', 'copy:bower_components']);
};
