//引入koa
const Koa = require('koa');
//引入路由库
const _ = require('koa-route');
//引入路由库
const Router = require('koa-router');
//创建app应用对象
const app = new Koa();
//业务逻辑

//创建一个路由器对象
//子类路由
const home = new Router();

home.get('/home1', (ctx, next) => {
  ctx.body = 'home1路由返回的响应';
})
home.get('/home2', (ctx, next) => {
  ctx.body = 'home2路由返回的响应';
})

//父类路由
const router = new Router();
router.use('/home', home.routes(), home.allowedMethods());

app
  .use(router.routes())
  .use(router.allowedMethods());

//路由器的使用
//创建路由器对象
/*const router = new Router();
router.get('/shop', (ctx, next) => {
  ctx.body = 'shop路由返回的响应';
})

router.get('/food', (ctx, next) => {
  ctx.body = 'food路由返回的响应';
})
//应用路由器
app
  .use(router.routes())
  .use(router.allowedMethods());*/

//路由的使用
/*app.use(_.all('/shop', (ctx, next) => {
  ctx.body = 'shop路由返回的响应';
}))

app.use(_.all('/shop/:id', (ctx, id, next) => {
  console.log(id); // 123
  ctx.body = '/shop/:id路由返回的响应';
}))*/

//原生koa的使用
/*app.use((ctx, next) => {
  console.log(ctx.query); // { username: '123' }
  //返回响应
  ctx.body = '返回响应~';
})*/
//监听端口号
app.listen(3000, () => console.log('服务器启动成功了~'))