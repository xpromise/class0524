'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fn = fn;
/*
  暴露模块：
    分别暴露： export 后面完整的定义（变量/函数）
 */

var url = exports.url = 'http://localhost:3000';

function fn() {
  console.log('module1中的fn（）');
}