var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var spritesmith = require('gulp.spritesmith');
var sprite = require('gulp-css-spriter');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');


gulp.task('browser-sync',['cp','js','build','sass'], function() {
	browserSync.init({
		server: {
			baseDir: '..'
		}
	}) 
})
gulp.task('cp', function() {
	return gulp.src('assets/**/*', {base:'.'})
	.pipe(gulp.dest('..'))
})
gulp.task('js', function() {
	return gulp.src('js/*.js', {base: '.'})
	.pipe(rename({suffix: '.min'}))
	.pipe(uglify())
	.pipe(gulp.dest('..'))
})
gulp.task('build', function() {
	return gulp.src('pages/*.html')
	.pipe(gulp.dest('..'))
})
gulp.task('sass', function() {
	gulp.src('styles/*.scss')
		.pipe(sass().on('error', handleError))
		.pipe(prefix())
		.pipe(minifycss())
		.pipe(gulp.dest('../styles'))
		.pipe(browserSync.reload({stream: true}));
})
/*gulp.task('sprite', function() {
	return gulp.src('./assets/pc/*.png')
	.pipe(spritesmith({
		'imgName': 'sprite.png',
		'cssName': 'sprite.css'
	}))
	.pipe(gulp.dest('../assets'))
})*/

function handleError(err) {
	console.log(err.toString());
	this.emit('end');
}
gulp.task('watch', function() {
	gulp.watch('js/*.js', ['js']);
	gulp.watch('assets/*', ['cp']);
	gulp.watch('styles/*.scss', ['sass']);
	gulp.watch('pages/*.html', ['build']).on('change', browserSync.reload)
})
gulp.task('default', ['browser-sync', 'watch'])