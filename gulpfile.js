'use strict'

var gulp = require('gulp')
var $ = require('gulp-load-plugins')()
var babel = require('rollup-plugin-babel')

gulp.task('standard', function () {
  return gulp.src(['src/**/*.js', '!test/**/*.js'])
    .pipe($.standard())
    .pipe($.standard.reporter('default', {breakOnError: true}))
})

gulp.task('test', function () {
  require('babel-core/register')
  return gulp.src(['test/**/*.js', '!test/*.js'], {read: false})
    .pipe($.mocha({reporter: 'min'}))
})

gulp.task('watch', function () {
  gulp.watch(['src/**/*.js', 'test/**/*.js', '!test/suite.js'], ['standard', 'test'])
})

gulp.task('default', function () {
  gulp.start('watch')
})

gulp.task('bundle-tests', function () {
  gulp.src('test/suite.es6', {read: false})
    .pipe($.rollup({
      format: 'amd',
      plugins: [ babel({
        babelrc: false,
        presets: [ 'es2015-rollup' ]
      })],
      sourceMap: true
    }))
    .pipe($.rename('suite.js'))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./test'))
})

gulp.task('watch-bundle', function () {
  gulp.watch(['src/**/*.js', 'test/**/*.*'], ['bundle-tests'])
})

gulp.task('test-phantom', ['bundle-tests'], function () {
  gulp.src('test/index.html')
    .pipe($.mochaPhantomjs({
      phantomjs: { useColors: true }
    }))
})

gulp.task('test-browser', ['bundle-tests'], function () {
  gulp.src('test/index.html')
    .pipe($.open())
})
