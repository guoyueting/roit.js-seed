/**
 * Created by guoyueting on 2017/7/4.
 */

var usemin = require('gulp-usemin');
var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var minifyHtml = require('gulp-minify-html');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');
var del = require('del');
var compass = require('gulp-compass');
var path = require('path');
var rename = require("gulp-rename");
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var riot = require("gulp-riot");
var buffer = require('vinyl-buffer');
var csso = require('gulp-csso');
var imagemin = require('gulp-imagemin');
var merge = require('merge-stream');
var spritesmith = require('gulp.spritesmith');
var browserify = require("browserify");
var sourcemaps = require("gulp-sourcemaps");
var source = require('vinyl-source-stream');




var sassList = ['./sass/**/*.scss', './sass/**/**/*.scss'];
var tagList = ['./tag/**/*.tag', './tag/**/**/*.tag'];
var spriteList = ['./images/index/*.png'];



var cssHandlebarsHelpers = {
    px2rem: function(input) {
        return input;
    }
};


/*
 * 1--启动
 */

gulp.task('default', ['build'], function() {
    browserSync.init({
        server: __dirname,
        port: 8991
    });
    gulp.watch(sassList, ['compass']);
    gulp.watch(tagList, ['riot']);
    // gulp.watch(spriteList, ['sprite.index']);
    gulp.watch(['./js/**/*.js'], ['browserify']);

    //gulp.watch("./**/*.html").on('change', reload);
    //gulp.watch("./dist/js/**/*.js").on('change', reload);
    //gulp.watch("./css/**/*.css").on('change', reload);
});

/*
 * 2--编译
 */

gulp.task('build', ['riot', 'compass'], function() {
    gulp.run('browserify');
});

/*
 * 2.1--sass编译
 */
gulp.task('compass', function() {
    return gulp.src(sassList)
        .pipe(compass({
            project: __dirname,
            css: 'css',
            sass: 'sass',
            image: './',
            generated_images_path: 'css'
        })).pipe(reload({ stream: true }));
});

/*
 * 2.2--riot编译
 */
gulp.task('riot', function() {
    // console.log('riot--start');
    return gulp.src(tagList)
        .pipe(riot())
        .pipe(concat('riot-component.js'))
        .pipe(gulp.dest('./js'));
});

/*
 * 3--sprite
 */
/*gulp.task('sprite.index', function() {
    return;
    var spriteData = gulp.src('./images/index/!**!/!*.png').pipe(spritesmith({
        imgName: 'sprite.index.png',
        cssName: 'sprite.index.css',
        cssTemplate: 'handlebarsStr.css.handlebars',
        cssHandlebarsHelpers: cssHandlebarsHelpers,
        retinaSrcFilter: ['./images/index/!*@2x.png'],
        retinaImgName: 'sprite.index@2x.png'
    }));
    var imgStream = spriteData.img
        .pipe(buffer())
        .pipe(imagemin())
        .pipe(gulp.dest('./css/'));
    var cssStream = spriteData.css
        .pipe(gulp.dest('./css/'));
    return merge(imgStream, cssStream);
});*/

gulp.task("browserify", function() {
    var b = browserify({
        entries: ['./js/riot-component.js'],
        debug: true
    });
    return b.bundle()
        .pipe(source("bundle.js"))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("./dist"));
});


/*
 * 4---编译打包
 */
gulp.task('clean', function() {
    return del(['./release']);
});
gulp.task('usemin', ['clean'], function() {
    var jsTask = [];
    // 判断时候混淆压缩js文件
    if (!gulp.env.uc) {
        jsTask.push(uglify);
    }
    jsTask.push(rev);
    gulp.src(['./*.html', './intro/*.html'], { base: './' })
        .pipe(usemin({
            css: [minifyCSS, rev],
            js: jsTask,
            inlinejs: [uglify],
            inlinecss: [minifyCSS, 'concat']
        }))
        .pipe(gulp.dest('./release/recruit'));
});
gulp.task('release', ['clean', 'usemin'], function() {
    gulp.src('images/**/*').pipe(gulp.dest('release/recruit/images/'));
});
