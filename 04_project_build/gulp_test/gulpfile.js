//1. 引入插件模块
const gulp = require('gulp');
const jshint = require('gulp-jshint');
const babel = require('gulp-babel');

//2. 配置插件任务
/*
  在gulp.task里面回调函数中，
    如果加上了return ，任务就是异步的
    如果不加return ，任务就是同步的
 */
gulp.task('jshint', () => {
  //任务的具体内容
  return gulp.src('./src/js/*.js')   //将指定目录下的所有文件以nodejs流的方法导入gulp内存中
    .pipe(jshint({esversion: 6}))     //语法检查
    .pipe(jshint.reporter('default'));  //将语法错误提示出来
})
/*
  gulp.task('任务一', ['任务二', '任务三'], () => {})
    等待'任务二', '任务三'全部执行完毕后，才会执行任务一
 */
gulp.task('babel', ['jshint'], () => {
  return gulp.src('src/js/*.js')
    .pipe(babel({   //将流中的文件做好语法转换
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest('build/js'))   //将流中的文件输出出去
})


//3. 配置默认任务
gulp.task('default', ['babel']);