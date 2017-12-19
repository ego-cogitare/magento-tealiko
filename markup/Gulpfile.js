'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const handlebars = require('gulp-compile-handlebars');
const rename = require('gulp-rename');
const clean = require('gulp-clean');
const imagemin = require('gulp-imagemin');

gulp.task('sass:dev', function () {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./../web/css'));
});

gulp.task('sass:prod', function () {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./../web/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./src/sass/**/*.scss', ['sass:dev']);
});

gulp.task('handlebars', function () {

    var templateData = {};

    var options = {
        ignorePartials: true,
        batch : ['./src/partials'],
        helpers : {
            capitals : function(str){
                return str.toUpperCase();
            }
        }
    }

    return gulp.src('./src/*.hbs')
        .pipe(handlebars(templateData, options))
        .pipe(rename(function (path) {
            path.extname = '.html';
        }))
        .pipe(gulp.dest('./../web'));
});

gulp.task('handlebars:watch', function () {
  gulp.watch('./src/**/*.hbs', ['handlebars']);
});

gulp.task('clean', function () {
    return gulp.src('../web/*', {read: false})
        .pipe(clean());
});


gulp.task('images:prod', () =>
	gulp.src('./src/img/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest('./../web/img'))
);

gulp.task('js', () =>
	gulp.src('src/js/*')
		.pipe(imagemin())
		.pipe(gulp.dest('../web/js'))
);

gulp.task('js:watch', () =>
	gulp.watch('src/js/*', ['js'])
);

gulp.task('fonts', function () {
    return gulp.src('./src/fonts/*.*')
        .pipe(gulp.dest('./../web/fonts'));
});

gulp.task('css', function () {
    return gulp.src('./src/css/**/*')
        .pipe(gulp.dest('./../web/css'));
});

gulp.task('images:dev', function () {
    return gulp.src('./src/img/**/*')
        .pipe(gulp.dest('./../web/img'));
});

gulp.task('dev', ['fonts', 'images:dev', 'sass:dev', 'css', 'js', 'handlebars']);

gulp.task('watch', ['dev', 'handlebars:watch', 'sass:watch', 'js:watch']);

gulp.task('default', ['fonts', 'images:prod', 'js', 'sass:prod', 'css', 'handlebars']);
