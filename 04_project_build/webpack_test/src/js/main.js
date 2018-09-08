//引入模块
import {add} from './module3';
import sum from './module4';

import data from '../json/data';

import '../less/test1.less';
import '../less/test2.less';


console.log(add(20, 30));
console.log(add(10, 30));
console.log(sum(4, 5, 6, 7));
console.log(data);

/*
  webpack 静态模块打包器：
    默认能打包的资源有 js  json
    其他资源就识别不了，所以需要引入相应loader去解析
    
    entry 入口   打包资源的入口文件
    output 输出  打包后输出生成的文件
    loader  加载webpack不识别的文件，包装成一个webpack能识别的模块
    plugins 插件  用来做更加强大的功能
    
    webpack ./src/js/main.js ./build/js/main.js
    webpack 入口文件 输出路径
 */