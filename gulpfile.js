var gulp = require('gulp'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    addsrc = require('gulp-add-src'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream');

var build_dir = 'web/build';


var cssFiles = [
    'web/bower_components/bootstrap/dist/css/bootstrap.min.css'
];

var jsFiles = [
    'web/bower_components/jquery/dist/jquery.min.js',
    'web/bower_components/underscore/underscore-min.js',
    'web/bower_components/bootstrap/dist/js/bootstrap.min.js',
    'web/bower_components/react/react.js',
    'web/bower_components/react/react-dom.js',
    'node_modules/react-router/umd/ReactRouter.min.js'
];


gulp.task('javascript', function() {

    return browserify({entries: ['web/src/app.js'] })
        .transform(babelify.configure({presets: ['es2015', 'react']}))
        .bundle()
        .pipe(source('app.min.js'))
        .pipe(gulp.dest(build_dir));
});



gulp.task('javascript-deps', function() {

    return gulp.src(jsFiles)
        .pipe(concat('app-deps.min.js'))
        .pipe(gulp.dest(build_dir));
});


gulp.task('scss', function() {

    return gulp.src('web/scss/app.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(addsrc.prepend(cssFiles))
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest(build_dir));
});

gulp.task('watch', function () {
    gulp.watch('./web/scss/**/*.scss', ['scss']);
    gulp.watch('./web/src/**/*.js', ['javascript']);
});

gulp.task('default', ['javascript-deps', 'javascript', 'scss']);