/*
  自定义的模块：路径必须以./ 或者 ../开头
  第三方模块或者node自带核心模块，路径直接写函数名
  
  node中自带解析三种文件
    .js .json .node
  
 */
const m1 = require('./module/module1');
const m2 = require('./module/module2');


console.log(m2.getNews(m1.newsUrl));
console.log(m2.getComments(m1.commentsUrl));