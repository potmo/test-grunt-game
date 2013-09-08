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
		},
		bump: {
			options: {
				files: ['package.json'],
				updateConfigs: [],
				commit: true,
				commitMessage: 'Release v%VERSION%',
				commitFiles: ['-a'], // '-a' for all files
				createTag: true,
				tagName: 'v%VERSION%',
				tagMessage: 'Version %VERSION%',
				push: true,
				pushTo: 'upstream',
				gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d' // options to use with '$ git describe'
			}
}

	});

	grunt.loadNpmTasks('grunt-typescript');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-bump');

	grunt.registerTask('default', ['typescript',  'uglify']);



};