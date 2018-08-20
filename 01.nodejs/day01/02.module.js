/*
  commonjs模块化规范
    暴露模块的内容
      module.exports  等于一个对象，往对象上添加属性或者方法
      exports         exports本身就是一个对象，只能往exports上添加属性或者方法
    引入其他模块的内容
      require(模块路径)
      - 模块路径
        用户自定义的模块 引入模块的路径必须以 ./ 或者 ../ 开头
        第三方模块（通过npm下载）和node核心模块（fs，path...） 直接写模块名称
      - 模块扩展名
        node中自带就能解析三种文件：.js  .json  .node，其他的文件都解析不了
        当通过require引入模块时，默认会以以上三种文件的扩展名补充文件名称
      - 解析规则
        引入模块的路径以 ./ 或者 ../ 开头，它会直接上此路径找，找到就返回，没找到就报错
        引入模块的路径直接是模块的名称，
          如果是node核心模块，直接找到编译好的源码直接使用，
          如果是第三方的模块，它会去当前目录下的node_modules找，找到了就返回，
            如果没找到，去上一级目录找node_modules,直到根目录下node_modules
            如果还没找到，就会报错
        
    模块暴露的本质是什么？
      向外暴露的是module.exports对象
 */
//引入其他模块
var m1 = require('./myModule1');
var m2 = require('./myModule2');

//使用模块
console.log(m1.add(2, 3));
console.log(m2);
console.log(m2.sum([1, 2, 3, 4]));
