var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),

    PATHS = {
        lib: {
            src: 'dega.js',
            min: 'dega.min.js',
            dest: './dist'
        },
        doc: {
            dest: './doc'
        }
    };

gulp.task('js', function() {
    gulp.src(PATHS.lib.src)
        .pipe($.jshint())
        .pipe($.uglify())
        .pipe($.rename(PATHS.lib.min))
        .on('error', console.error.bind(console))
        .pipe(gulp.dest(PATHS.lib.dest));
});

gulp.task('build', [
    'js'
]);
