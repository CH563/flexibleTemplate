// 导入需要的模块
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    px2rem = require('postcss-px2rem'),
    autoprefixer = require('autoprefixer'),
    pug = require('gulp-pug'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync').create(),
    plumber = require('gulp-plumber'),
    minifyCss = require('gulp-minify-css'),
    tinypng = require('gulp-tinypng-compress');



//定义css任务
gulp.task('css', function() {
    gulp.src('src/sass/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([
            autoprefixer({
                browsers: ['last 2 versions', 'Android >= 4.0'],
                cascade: true, //是否美化属性值 默认：true
                remove: true //是否去掉不必要的前缀 默认：true
            }),
            px2rem({ remUnit: 64 })
        ]))
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css'));
});


// pug任务
gulp.task('pug', function() {
    gulp.src('src/pug/*.pug')
        // .pipe(plumber())
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest('dist'));
});

// js任务
gulp.task('js', function() {
    gulp.src('src/js/*.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});


// 复制图片
gulp.task('images', function() {
    gulp.src('src/images/**/*.{gif,svg,ico,bmp}')
        .pipe(gulp.dest('dist/images'));

    gulp.src('src/images/**/*.{png,jpg,jpeg}')
        .pipe(tinypng({
            key: '1zutRX0epvR0ni7FDpGcrO1FMcD3dKO-',
            sigFile: 'dist/images/.tinypng-sigs',
            log: true
        }))
        .pipe(gulp.dest('dist/images'));
});



// 编译所有
gulp.task('todist', ['pug', 'js', 'css', 'images']);

// 默认任务
gulp.task('default', ['watch']);


// 监听任务
gulp.task('watch', function() {
    // 建立浏览器自动刷新服务器
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });


    // 预处理
    gulp.watch('src/pug/**', ['pug']);
    gulp.watch('src/js/**', ['js']);
    gulp.watch('src/sass/**', ['css']);
    gulp.watch('src/images/**', ['images']);


    // 自动刷新
    gulp.watch('dist/**', function() {
        browserSync.reload();
    });

});
