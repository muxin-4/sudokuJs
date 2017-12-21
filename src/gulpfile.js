const gulp = require('gulp');

// 转译Javascript
gulp.task('webpack', () => {
    // 将你的默认的任务代码放在这
    const webpack = require("webpack-stream");
    const config = require("./webpack.config.js");
    gulp.src("./js/**/*.js")
        .pipe(webpack(config))
        .pipe(gulp.dest("../www/js"));
});

// 编译 less -> css
gulp.task("less", () => {
    const scss = require("gulp-less");
    gulp.src("./less/*.less")
        .pipe(scss())
        .pipe(gulp.dest("../www/css"));
});

gulp.task("watch", () => {
  gulp.watch("less/**/*.less", ["less"]);
  gulp.watch("js/**/*.js", ["webpack"]);
});

gulp.task('default', ['webpack', 'less']);
