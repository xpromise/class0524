//引入需要使用的模块
//连接数据库
require('./db/db');

var Students = require('./model/Students');

//创建文档对象
var s = new Students({
  name: '晓飞张',
  age: 20,
  sex: '男',
  address: '宏福苑',
  phone: '18888888888',
  hobby: ['台球', 'code']
})

//保存文档对象
s.save(function (err) {
  if (!err) console.log('数据保存成功');
  else console.log(err);
})
