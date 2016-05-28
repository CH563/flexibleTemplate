#淘宝flexible移动适配方法-说明[在此](https://github.com/amfe/article/issues/17)
####使用flexible搭建gulp工作目录和常用插件方便平时工作需要

主要使用的插件有

[gulp-sass](https://www.npmjs.com/package/gulp-sass) 编译sass，配合postcss会成为libsass编译

[gulp-postcss](https://www.npmjs.com/package/gulp-postcss) 利用JS插件实现的用来改变CSS的工具[说明](http://aotu.io/notes/2015/10/13/start-postcss/)

[postcss-px2rem](https://www.npmjs.com/package/postcss-px2rem) postcss的px自动转rem插件，方便淘宝flexible使用转化

[postcss-px2rem](https://www.npmjs.com/package/postcss-px2rem) postcss的px自动转rem插件

[autoprefixer](https://www.npmjs.com/package/autoprefixer) postcss的自动加前缀插件

[gulp-minify-css](https://www.npmjs.com/package/gulp-minify-css) 压缩css代码

``` javascript
gulp.task('css', function() {
    gulp.src('src/sass/*.scss')
        .pipe(plumber()) //最前面
        .pipe(sass()) //需要放在postcss前面
        .pipe(postcss([
            autoprefixer({
                browsers: ['last 2 versions', 'Android >= 4.0'],
                cascade: true, //是否美化属性值 默认：true
                remove: true //是否去掉不必要的前缀 默认：true
            }),
            px2rem({ remUnit: 75 }) //视设计图大小而设
        ]))
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css'));
});
```

[gulp-pug](https://www.npmjs.com/package/gulp-pug) 编译jade[说明](https://github.com/pugjs/pug)

[gulp-uglify](https://www.npmjs.com/package/gulp-uglify) 压缩JS代码

[browser-sync](https://www.npmjs.com/package/browser-sync) 搭建浏览器同步自动刷新

[gulp-plumber](https://www.npmjs.com/package/gulp-plumber) 检查代码编译报错，改正而不退出gulp任务

[gulp-tinypng-compress](https://www.npmjs.com/package/gulp-minify-css) 压缩图片，需要上[官网](https://tinypng.com/)申请密钥,免费版一个月可以压500张



全局安装了`node/npm/gulp/sass/pug`等后

clone本目录到本地，然后在本目录运行`npm install`安装

安装后运行`gulp`即可以实时查看浏览

全部文件生成到`<dist>`命令是`gulp todist`

