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