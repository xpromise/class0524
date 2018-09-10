(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _module = require('./module1');

var _module2 = require('./module2');

var _module3 = require('./module3');

var _module4 = _interopRequireDefault(_module3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('***************'); /*
                                  引入模块：
                                    分别暴露和统一暴露的模块，引入的规则：import {模块暴露的内容} from '模块的路径’
                                    默认暴露，引入的规则：import 模块暴露的内容 from '模块的路径';
                                 */

//对象的结构赋值

console.log(_module.url);
(0, _module.fn)();

(0, _module2.foo1)();
(0, _module2.foo2)();

var p = new _module4.default('jack', 18);
console.log(p);
},{"./module1":2,"./module2":3,"./module3":4}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
  默认暴露: 只能向外暴露一个内容
    - 给default变量赋值，最终暴露出去default指向的值
 */

var Person = function Person(name, age) {
  _classCallCheck(this, Person);

  this.name = name;
  this.age = age;
};

exports.default = Person;
},{}]},{},[1]);
