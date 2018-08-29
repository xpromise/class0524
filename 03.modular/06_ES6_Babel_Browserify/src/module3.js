/*
  默认暴露: 只能向外暴露一个内容
    - 给default变量赋值，最终暴露出去default指向的值
 */

class Person {
  constructor (name, age) {
    this.name = name;
    this.age = age;
  }
}

export default Person;

