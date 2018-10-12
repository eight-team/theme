module.exports = function(grunt) {
     // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
         /* grab the Bootstrap js and combine it with my custom scripts
        The goal is to limit the number of http requests to increase load time
         */
        concat: {
            options: {
                stripBanners: false,
                sourceMap: true,
                banner: '',
            },
            scripts: {
                src: ['bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js', 'js/plugins.js', 'js/main.js'],
                dest: '../wp-content/themes/gogotheme/assets/js/scripts.js',
            },
        },
         /* Now minify the scripts */
        uglify: {
            defer: {
                src: ['js/defer.js'], //input
                dest: '../wp-content/themes/gogotheme/assets/js/defer.min.js' //output
            },
            scripts: {
                src: ['../wp-content/themes/gogotheme/assets/js/scripts.js'], //input
                dest: '../wp-content/themes/gogotheme/assets/js/scripts.min.js' //output
            },
        },
         /* Convert the Sass into CSS */
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    '../wp-content/themes/gogotheme/assets/css/styles.css': 'sass/styles.scss'
                }
            }
        },
         /* Make sure the CSS accounts for browser inconsistency */
        postcss: {
            options: {
                map: true,
                processors: [
                    require('pixrem')(), // add fallbacks for rem units
                    require('autoprefixer')({ browsers: 'last 2 versions' }), // add vendor prefixes
                    require('postcss-flexbugs-fixes'),
                    //require('cssnano')() // minify the result
                ]
            },
            dist: {
                src: '../wp-content/themes/gogotheme/assets/css/*.css'
            }
        },
         /* Auto Update the scripts and styles when working */
        watch: {
            scripts: {
                files: ['js/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                },
            },
            styles: {
                files: ['sass/*.scss'],
                tasks: ['sass', 'postcss'],
                options: {
                    spawn: false,
                },
            },
        },
     });
    // END GRUNT
     // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-watch');
     // Default task(s).
    grunt.registerTask('default', ['concat', 'uglify', 'sass', 'postcss']);
 };
