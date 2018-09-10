'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
  统一暴露：export {要暴露的内容}
 */

function foo1() {
  console.log('module2中foo1（）');
}

function foo2() {
  console.log('module2中foo2（）');
}
//对象简写方式
exports.foo1 = foo1;
exports.foo2 = foo2;