var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var autoprefix = require('gulp-autoprefixer');
var notify = require('gulp-notify');
var bower = require('gulp-bower');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');


var config = {
	bowerDir: './musketeerfoods/static/bower_components',
	bootstrapDir: './musketeerfoods/static/bower_components/bootstrap-sass',
	staticDir: './musketeerfoods/static',
	sassDir: './musketeerfoods/static/sass',
	cssDir: './musketeerfoods/static/css',
};

gulp.task('bower', function() {
	return bower()
		.pipe(gulp.dest(config.bowerDir))
});

gulp.task('ltie9', function() {
	gulp.src([
		config.bowerDir + '/html5shiv/dist/html5shiv.js',
		config.bowerDir + '/respond/dest/respond.src.js'
	])
		.pipe( concat('ltie9.js') )
		.pipe(uglify())
		.pipe(gulp.dest(config.staticDir + '/js'))
});

gulp.task('css', function() {
	return sass('./musketeerfoods/static/sass', {
		style: 'expanded',
		loadPath: [
			config.bootstrapDir + '/assets/stylesheets'
		]
	})
	.on('error', sass.logError)
	.pipe(autoprefix('last 2 version'))
	.pipe(gulp.dest(config.cssDir))
	.pipe(rename({suffix: '.min'}))
	.pipe(minifycss())
	.pipe(gulp.dest(config.cssDir));
});

gulp.task('watch', function() {
	gulp.watch(config.staticDir + '/sass/**/*.scss', ['css']);
});

gulp.task('default', ['css']);