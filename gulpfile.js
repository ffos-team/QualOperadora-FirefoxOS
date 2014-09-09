var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var zip = require('gulp-zip');

gulp.task('minifyJS', function () {
  return gulp.src('assets/js/*.js')
    .pipe(uglify())
    .pipe(rename('*.js'))
    .pipe(gulp.dest('dist/assets/js/'))
});

gulp.task('minifyCSS', function() {
  return gulp.src('assets/css/*.css')
    .pipe(minifyCSS({keepBreaks: false}))
    .pipe(rename('*.css'))
    .pipe(gulp.dest('dist/assets/css'))
});

gulp.task('images', function () {
	return gulp.src('assets/img/*')
		.pipe(gulp.dest('dist/assets/img'))
});

gulp.task('moving-dist', function () {
	return gulp.src(['*.html', '*.webapp'])
		.pipe(gulp.dest('dist/'));
});

// $ gulp deploy
gulp.task('deploy', ['minifyJS', 'minifyCSS', 'images', 'moving-dist'], function () {
	gulp.src('dist/*')
    .pipe(zip('qualoperadora.zip'))
    .pipe(gulp.dest('dist/'));
});
