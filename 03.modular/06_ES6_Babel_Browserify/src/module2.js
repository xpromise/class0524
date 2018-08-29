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
export {foo1, foo2};