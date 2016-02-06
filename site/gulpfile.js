var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    gutil = require('gulp-util'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    files = {
        js: [
            'js/jquery.min.js',
            'js/client.js',
            'js/image-fit.js',
            'js/script.js',
            '!js/**/*.map.js',
            '!js/**/*.js.map',
            '!js/**/bundle.min.js'
        ],
        css: 'css/**/*.scss'
    }

gulp.task('bundle', function () {
    return gulp.src(files.js)
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.min.js'))
        .pipe(uglify().on('error', gutil.log))
        .pipe(sourcemaps.write('../js'))
        .pipe(gulp.dest('js'));
});

gulp.task('sass', function () {
    gulp.src(files.css)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(sourcemaps.write('../css'))
        .pipe(gulp.dest('css'));
});

gulp.task('watch', function () {
    gulp.watch(files.js, ['bundle']);
    gulp.watch(files.css, ['sass']);
});

gulp.task('default', ['bundle', 'sass', 'watch']);
