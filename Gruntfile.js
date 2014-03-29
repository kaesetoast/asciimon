module.exports = function(grunt) {

    'use strict';

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            all: ['src/**/*.js', 'test/**/*.js', '!src/_foot.js', '!src/_head.js']
        },

        concat: {
            dist: {
                src : [
                    'src/_head.js',
                    'src/main.js',
                    'src/_foot.js'
                ],
                dest: 'dist/asciimon.js'
            }
        },

        uglify: {
            all: {
                files: {
                    'dist/asciimon.min.js': 'dist/asciimon.js'
                }
            }
        },

        jsbeautifier: {
            files: ['dist/asciimon.js']
        },

        watch: {
            html: {
                files: ['demo/index.html', 'monster'],
                tasks: []
            },
            js: {
                files: ['src/**/*.js', 'demo/*.html'],
                tasks: ['jshint', 'concat', 'jsbeautifier', 'uglify']
            },
            options: {
                livereload: 35729,
                atBegin: true
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jsbeautifier');

    grunt.registerTask('default', ['watch']);

};