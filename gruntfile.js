'use strict';

module.exports = function (grunt) {
    require('time-grunt')(grunt);

    var deployUrl = '/';

    grunt.initConfig({
        copy: {
            main: {
                files: [
                    // includes files within path
                    {src: ['**/*.*'], dest: deployUrl, expand: true}
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['release']);

    grunt.registerTask('release', ['copy:main']);


};

