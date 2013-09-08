module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		typescript: {
			base: {
				src: ['src/main/ts/**/*.ts', 'node_modules/test-grunt-dependency-a/src/main/ts/**/*.ts', 'node_modules/test-grunt-dependency-a/node_modules/test-grunt-dependency-b/src/main/ts/**/*.ts'],
				dest: 'target/application.js',
				options: {
					module: 'amd', //or commonjs
					target: 'es5', //or es3
					base_path: 'src/main/ts',
					sourcemap: true,
					fullSourceMapPath: true,
					declaration: true
				}
			}
		},
		uglify: {
			my_target: {
				options: {
					sourceMapPrefix: 1,
					preserveComments: false,
					sourceMap: 'target/application.min.js.map',
					sourceMapRoot: '.', // the location to find your original source
					sourceMapIn: 'target/application.js.map' // input sourcemap from a previous compilation
				},
				files: {
					'target/application.min.js': ['target/application.js']
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-typescript');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-bump');

	grunt.registerTask('default', ['typescript',  'uglify']);



};