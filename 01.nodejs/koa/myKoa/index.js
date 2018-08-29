
const MyKoa = require('./application');

//创建app应用对象
const app = new MyKoa();

app.use((req, res) => {
  res.setHeader('Content-Type', 'text/html;charset=utf8');
  res.end('这是自定义服务器返回的响应');
})

app.listen(3000, () => console.log('服务器启动成功了~'))