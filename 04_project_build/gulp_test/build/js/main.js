"use strict";

var _module = _interopRequireDefault(require("./module3"));

var _module2 = _interopRequireDefault(require("./module4"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//引入模块
console.log((0, _module.default)(20, 30));
console.log((0, _module.default)(10, 30));
console.log((0, _module.default)(10, 20));
console.log((0, _module2.default)(4, 5, 6, 7));