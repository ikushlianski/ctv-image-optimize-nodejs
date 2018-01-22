var gulp       = require('gulp'), // Подключаем Gulp
	rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
	del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
	fs 					 = require('fs'),
	path				 = require('path'),
	using 			 = require('gulp-using'),
	vinylPaths 	 = require('vinyl-paths'),
	cache        = require('gulp-cache'),
	jimp         = require("gulp-jimp-resize"),
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

gulp.task('ctv', /*['optimize', 'deleteImg'],*/ function(){
	return watch('images_to_optimize/*.{png,jpg,jpeg,JPG}', function() {
        fs.readdir('images_to_optimize/', function(err, files) {
            if (err) {
               // some sort of error
            } else {
               if (files.length) {
                //    setTimeout(function(){
           			   gulp.start(['deleteImg']);
          //  		   }, 1000);
               }
            }
        });
    });
});

gulp.task('deleteImg', ['optimize'], function() {
	del.sync(['images_to_optimize/**', '!images_to_optimize']);
});

gulp.task('optimize', function () {
  return gulp.src('./images_to_optimize/**/*.{png,jpg,jpeg,JPG}')
        .pipe(jimp({
            sizes: [
                {"suffix": "md", "width": 800, "upscale": false}
            ],
        }))
        .pipe(image())
		.pipe(gulp.dest('./optimized'));
});

// gulp.task('moveFiles', function () {
//   return gulp.src('./images_to_optimize/**/*.{png,jpg,jpeg,JPG}')
// 	.pipe(vinylPaths(function (paths) {
// 		let oldPath = path.parse(paths).dir;
// 		let myfilename = path.parse(paths).base;
// 		let newPath = path.normalize("D:\\temp\\ctvimages\\optimized") + path.normalize("\\") + myfilename;
// 		fs.rename(oldPath + path.normalize("\\") + myfilename, newPath, function(){
// 			console.log('files moved');
// 		});
// 		return Promise.resolve();
//
// 	}));
// });

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
