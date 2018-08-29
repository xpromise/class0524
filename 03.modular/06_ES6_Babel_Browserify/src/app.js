/*
  引入模块：
    分别暴露和统一暴露的模块，引入的规则：import {模块暴露的内容} from '模块的路径’
    默认暴露，引入的规则：import 模块暴露的内容 from '模块的路径';
 */

/*
  可以在package.json中配置scripts来去运行指定的指令
    "build": "babel src -d build && browserify ./build/app.js -o ./dist/dist.js"
    配置以后，就可以通过 npm run build运行当前指令
 */

/*
  {a as b} 将模块中暴露的a内容重命名为b
 */

//对象的结构赋值
import {url as xxx, fn} from './module1';
import {foo1, foo2} from './module2';
import Person from './module3';

console.log('***************');
console.log(xxx);
fn();

foo1();
foo2();

const p = new Person('jack', 18);
console.log(p);