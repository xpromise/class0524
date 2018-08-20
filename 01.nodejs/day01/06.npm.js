//使用函数库
var math = require('math');
/*
  npm install/i xxx  下载指定包
    1. 在当前目录下创建node_modules文件夹
      在文件夹中将指定包安装好
    2. 新建一个package-lock.json 做了缓存处理，让下一次的下载更快
    3. 将下载的包添加到生产依赖中  相当于 npm i xxx --save / npm i xxx -S
  
  npm i xxx --save-dev  下载指定包添加到开发依赖中  npm i xxx -D
  
  
    
  
 */

console.log(math.add(2, 3));
console.log(math.mul(2, 3));