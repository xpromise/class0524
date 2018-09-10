(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*
  自定义的模块：路径必须以./ 或者 ../开头
  第三方模块或者node自带核心模块，路径直接写函数名
  
  node中自带解析三种文件
    .js .json .node
  
 */
const m1 = require('./module1');
const m2 = require('./module2');


console.log(m2.getNews(m1.newsUrl));
console.log(m2.getComments(m1.commentsUrl));
},{"./module1":2,"./module2":3}],2:[function(require,module,exports){

const prefix = 'http://localhost:3000/';

const newsUrl = `${prefix}news`;
const commentsUrl = `${prefix}comments`;

exports.newsUrl = newsUrl;
exports.commentsUrl = commentsUrl;
},{}],3:[function(require,module,exports){


function getNews(url) {
  console.log(`请求地址：${url}`);
  return 'newsData';
}

function getComments(url) {
  console.log(`请求地址：${url}`);
  return 'commentsData';
}
//对象的简写方式
module.exports = {
  getNews,
  getComments
}
},{}]},{},[1]);
