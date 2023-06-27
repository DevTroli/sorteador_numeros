module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
                files: {
                    'dev/style/main.css': 'src/style/main.less'
                }
            },
            production: {
                options: {
                    compress: true
                },
                files: {
                    'dist/style/main.css' : 'src/style/main.less'
                }
            }
        },
        watch: {
            less: {
                files: ['src/style/**/*.less'],
                tasks: ['less:development']
            },
            html:{
                files: ['src/index.html'],
                tasks: ['replace:dev']
            }
        },
        replace: {
            dev: {
                options: {
                    patterns: [
                        {
                            match: 'main.css',
                            replacement: './style/main.css'
                        },
                        {
                            match: 'main.js',
                            replacement: '../src/scripts/main.js'
                        }]
                },
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['src/index.html'],
                    dest: 'dev/',
                }]
            },
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'main.css',
                            replacement: './style/main.min.css'
                        },
                        {
                            match: 'main.js',
                            replacement: './scripts/main.min.js'
                        }
                    ]
                },
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['prebuild/index.html'],
                    dest: 'dist/',
                }]

        }
    },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    'prebuild/index.html': 'src/index.html'
                }]
            }
        },
        clean:['prebuild'],
        uglify: {
            target:{
               files: {
                   'dist/main.min.js': ['src/scripts/main.js']
               } 
            }
        }
        
    })
   
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-replace');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['less:production', 'htmlmin:dist', 'replace:dist', 'clean','uglify']);	

};


