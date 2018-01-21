var gulp       = require('gulp'), // Подключаем Gulp
	rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
	del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
	imagemin     = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
	pngquant     = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
	fs 					 = require('fs'),
	path				 = require('path'),
	using 			 = require('gulp-using'),
	vinylPaths 	 = require('vinyl-paths'),
	cache        = require('gulp-cache'),
	imageResize  = require('gulp-image-resize'),
	image        = require('gulp-image'),
	watch 		   = require('gulp-watch'),
	filelog 		 = require('gulp-filelog');

// gulp.task('img', function() {
// 	return gulp.src('./images_to_optimize/**/*.{png,jpg,jpeg}') // Берем все изображения
// 		.pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
// 			interlaced: true,
// 			progressive: true,
// 			svgoPlugins: [{removeViewBox: false}],
// 			use: [pngquant()]
// 		})))
// 		.pipe(fs.rename(oldPath, newPath, callback))
// 		.pipe(gulp.dest('./')); // Выгружаем на продакшен
// });

gulp.task('ctv', ['optimize'], function(){
	return watch('images_to_optimize/*.{png,jpg,jpeg,JPG}', function() {
		setTimeout(function(){
			gulp.start('optimize');
		}, 2000);
  });
	// gulp.watch('images_to_optimize/*.jpg', ['moveFiles']);
});

gulp.task('optimize', ['moveFiles'], function () {
  return gulp.src('./optimized/**/*.{png,jpg,jpeg,JPG}')
		.pipe(image())
		.pipe(gulp.dest(function(file) {
    	return file.base;
  	}));
});

gulp.task('moveFiles', function () {
  return gulp.src('./images_to_optimize/**/*.{png,jpg,jpeg,JPG}')
	.pipe(vinylPaths(function (paths) {
		let oldPath = path.parse(paths).dir;
		let myfilename = path.parse(paths).base;
		let newPath = path.normalize("D:\\temp\\ctvimages\\optimized") + path.normalize("\\") + myfilename;
		fs.rename(oldPath + path.normalize("\\") + myfilename, newPath, function(){
			console.log('files moved');
		});
		return Promise.resolve();

	}));
});

gulp.task('img-wp', function() {
	return gulp.src('./images_to_optimize/**/*.{png,jpg,jpeg,JPG}') // Берем все изображения
		.pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest(function(file) {
    	return file.base;
  	}));
});
