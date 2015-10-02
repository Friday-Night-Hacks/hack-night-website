// Friday Night Hacks Gruntfile

module.exports = function(grunt) {
  grunt.initConfig({
    filerev: {
      options: {
        encoding: "utf8",
        algorithm: "md5",
        length: "20"
      },
      build: {
        files: [{
          src: ['src/js/*.js', 'src/css/*.css']
        }]
      }
    },
    useminPrepare: {
      html: 'src/index.html',
      options: {
        dest: 'dist/'
      }
    },
    usemin: {
      html: "dist/index.html",
      options: {
        assetsDirs: ['src/**/*']
      }
    },
    clean: {
      build: ['dist/**/*']
    },
    jshint: {
      options: {
        globals: {
          jQuery: true
        },
        ignores: ['*.min*']
      },
      all: ['src/js/**/*']
    },
    copy: {
      build: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['**', '!js/'],
          dest: 'dist/'
        }]
      }
    },
    uglify: {
      build: {
        files: {
          'dist/js/app.js': ['src/js/**/*.js']
        }
      }
    },
    watch: {
      files: ['src/**/*'],
      tasks: ['jshint', 'clean', 'copy', 'uglify']
    },
    mochaTest: {
      test: {
        src: ['test/spec.js']
      }
    }
  });
  grunt.loadNpmTasks('grunt-filerev');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('build', [
    "clean",
    "copy",
    "uglify",
    "watch"
  ]);

  grunt.registerTask('no-watch', [
    "clean",
    "copy",
    "uglify"
  ]);

  grunt.registerTask('default', [
    "jshint",
    "mochaTest",
    "clean:build",
    "useminPrepare",
    "concat:generated",
    "cssmin:generated",
    "uglify:generated",
    "filerev",
    "usemin",
    "watch"
  ]);
}
