/*jshint esversion: 6 */
/*jslint node: true */

'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const livereload = require('gulp-livereload');

livereload({ start: true});

gulp.task('sass', ()=>{
  return gulp.src('./css/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('./public'))
  .pipe(livereload());
});

gulp.task('watch', ()=>{
  livereload.listen();
  gulp.watch('./css/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'watch']);
