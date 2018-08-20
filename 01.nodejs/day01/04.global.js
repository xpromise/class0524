/*
  浏览器端 全局对象 window
  服务器端 全局对象 global
 */

// console.log(global);
/*
  setTimeout      延时定时器
  setInterval     循环定时器
  setImmediate      立即执行函数
  process.nextTick  立即执行函数
  Buffer   二进制数据
  console
 */
setImmediate(function () {
  console.log('setImmediate()');
})

setTimeout(function () {
  console.log('setTimeout()');
}, 0)

process.nextTick(function () {
  console.log('process.nextTick()');
})

/*
process.nextTick()
setTimeout()
setImmediate()
 */

/*
  node中的事件轮询机制：
    libuv实现node中事件轮询的
    
    事件轮询机制经历6个阶段：
      *** timers   定时器阶段：1. 开始计时   2. 执行定时器的回调函数
      pending callbacks  TCP错误阶段
      idle, prepare  准备阶段
      *** poll 轮询阶段
        轮询轮询队列。
        如果轮询队列中有回调函数，取出第一个函数执行，执行完后继续轮询下去，直到轮询队列为空或者达到系统的最大限制
        如果轮询队列中没有回调函数
          如果之前设置过setImmediate函数
            直接到达下一个阶段check阶段
          如果之前没有设置过setImmediate函数
            继续等待，轮询轮询队列（如果定时器到点了，它也会去下一个check阶段）
      *** check check阶段  执行setImmediate函数设置的回调函数
      close callbacks  关闭阶段 close/end 事件触发，再次阶段执行其中的回调函数
      
      
      process.nextTick 能在任意阶段优先执行
 */