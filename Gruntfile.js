module.exports = function(grunt) {

    grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
 	jshint: {
	    files: ['gruntfile.js', 'static/js/*.js'],
	    options: {
                eqeqeq: true,
                browser: true,
                globals: {
                    google: true,
                    console: true,
                    alert: true,
                    confirm: true,
                    window: true
                }
	    }
	},
        exec: {
            run_python_unit_tests: {
                command: 'python flask_tests.py'
            }
        },
        handlebars: {
            compile: {
                options: {
                    amd: true,
                    processName: function(filename) {
                        var pieces = filename.split("/");
                        return pieces[pieces.length - 1].replace(".html", ""); // output: header
                        return filename.toUpperCase();
                    }
                },
                files: {
                    "static/js/templates/tzone.js": "templates/js/tzone/*.html",
//                    "path/to/another.js": ["path/to/sources/*.hbs", "path/to/more/*.hbs"]
                },
            }
        },
	watch: {
            jsfiles: {
	        files: ['static/js/*.js', 'templates/js/tzone/*.html'],
	        tasks: ['jshint', 'handlebars']
            }
	}
    });


    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-exec');

    grunt.registerTask('test', ['jshint', 'exec:run_python_unit_tests']);
    grunt.registerTask('jslint', ['jshint']);
    grunt.registerTask('build-templates', ['handlebars']);


    grunt.registerTask('default', ['jshint', 'exec']);
};

