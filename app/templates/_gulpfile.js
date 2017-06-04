var gulp = require('gulp'),
    concat = require('gulp-concat'),
    del = require('del'),
    webpack = require('webpack'),
    webpackStream = require('webpack-stream');

    gulp.task('html', function() {
        return gulp.src('src/page.html')
            .pipe(gulp.dest('dist'));
    });

    gulp.task('css', function() {
        return gulp.src('src/styles/*.css')
            .pipe(gulp.dest('dist/styles'));
    });

    gulp.task('dev', ["html", "css"], function() {
        let webpackConfig = require('./webpack.config.js')('dev');

        return gulp.src('src/js/*.js')
            .pipe(webpackStream(webpackConfig, webpack))
            .pipe(gulp.dest('dist/js'));
    });

    gulp.task('prod', ["html", "css"], function() {
        let webpackConfig = require('./webpack.config.js')('build');

        return gulp.src('src/js/*.js')
            .pipe(webpackStream(webpackConfig, webpack))
            .pipe(gulp.dest('dist/js'));
    });

    /*
    to min
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())

    Sass compile (gulp-ruby-sass)
    Autoprefixer (gulp-autoprefixer)
    Minify CSS (gulp-cssnano)
    JSHint (gulp-jshint)
    Concatenation (gulp-concat)
    Uglify (gulp-uglify)
    Compress images (gulp-imagemin)
    LiveReload (gulp-livereload)
    Caching of images so only changed images are compressed (gulp-cache)
    Notify of changes (gulp-notify)
    Clean files for a clean build (del)
    */