
'use strict';

/**
 * Module dependencies.
 */

const isGeneratorFunction = require('is-generator-function');
const debug = require('debug')('koa:application');
const onFinished = require('on-finished');
const response = require('./response');
const compose = require('koa-compose');
const isJSON = require('koa-is-json');
const context = require('./context');
const request = require('./request');
const statuses = require('statuses');
const Emitter = require('events');
const util = require('util');
const Stream = require('stream');
const http = require('http');
const only = require('only');
const convert = require('koa-convert');
const deprecate = require('depd')('koa');

module.exports = class Application extends Emitter {
  constructor() {
    super();
    //中间件数组
    this.middleware = [];
    
    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);
  }

  //监听端口号的方法
  listen(...args) {
    debug('listen');
    //this.callback函数处理请求
    const server = http.createServer(this.callback());
    return server.listen(...args);
  }
  
  //中间件 app.use
  use(fn) {
    //往中间件数组中添加了中间件函数
    this.middleware.push(fn);
    return this;
  }

  //方法返回值是一个函数 (req, res) => {xxxx}
  callback() {
    //执行了所有可以执行的中间件函数，最终返回一个promise对象（成功的状态）
    const fn = compose(this.middleware);
    
    const handleRequest = (req, res) => {
      //创建ctx对象
      const ctx = this.createContext(req, res);
      //实际处理请求的就是当前这个函数
      return this.handleRequest(ctx, fn);
    };

    return handleRequest;
  }
  
  //实际上处理请求的函数
  handleRequest(ctx, fnMiddleware) {
   /* const res = ctx.res;
    res.statusCode = 404;
    const onerror = err => ctx.onerror(err);*/
    //返回响应的函数
    const handleResponse = () => respond(ctx);
    // onFinished(res, onerror);
    //fnMiddleware(ctx) 如果是成功的状态，此时他就执行了里面中间件函数
    return fnMiddleware(ctx).then(handleResponse).catch(onerror);
  }
  
  createContext(req, res) {
    const context = Object.create(this.context);
    const request = context.request = Object.create(this.request);
    const response = context.response = Object.create(this.response);
    context.app = request.app = response.app = this;
    context.req = request.req = response.req = req;
    context.res = request.res = response.res = res;
    request.ctx = response.ctx = context;
    request.response = response;
    response.request = request;
    context.originalUrl = request.originalUrl = req.url;
    context.state = {};
    //返回出去的ctx对象 就有所有的req和res、ctx对象所有的方法和属性
    return context;
  }
};

//根据用户设置ctx.body的内容，判断他的数据类型，从而返回不同的响应
function respond(ctx) {
  // allow bypassing koa
  if (false === ctx.respond) return;

  const res = ctx.res;
  if (!ctx.writable) return;

  let body = ctx.body;
  const code = ctx.status;

  // ignore body
  if (statuses.empty[code]) {
    // strip headers
    ctx.body = null;
    return res.end();
  }

  if ('HEAD' == ctx.method) {
    if (!res.headersSent && isJSON(body)) {
      ctx.length = Buffer.byteLength(JSON.stringify(body));
    }
    return res.end();
  }

  // status body
  if (null == body) {
    body = ctx.message || String(code);
    if (!res.headersSent) {
      ctx.type = 'text';
      ctx.length = Buffer.byteLength(body);
    }
    return res.end(body);
  }

  // responses
  if (Buffer.isBuffer(body)) return res.end(body);
  if ('string' == typeof body) return res.end(body);
  if (body instanceof Stream) return body.pipe(res);

  // body: json
  body = JSON.stringify(body);
  if (!res.headersSent) {
    ctx.length = Buffer.byteLength(body);
  }
  res.end(body);
}
