'use strict'

/**
 * Expose compositor.
 */

module.exports = compose

function compose (middleware) {
  //判断传入的参数是否是一个数组
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  //判断中间件数组中是否都是函数
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }

  /**
   * @param {Object} context
   * @return {Promise}
   * @api public
   */

  return function (context, next) {
    // last called middleware #
    let index = -1
    return dispatch(0)
    function dispatch (i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i  //0  1  2
      let fn = middleware[i]  //取出中间件数组的第一个函数  第二个函数  第三个函数
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
