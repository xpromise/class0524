//引入mongoose模块
var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
//连接数据库
mongoose.connect('mongodb://localhost:27017/mongoose_test', {useNewUrlParser: true});
//绑定事件，监听数据库是否连接成功
mongoose.connection.once('open', function (err) {
  if (!err) {
    console.log('数据库连接成功了~~~');
  } else {
    console.log(err);
  }
})
//获取schema模式对象
var Schema = mongoose.Schema;
//创建集合的约束对象
var studentsSchema = new Schema({
  name: String,
  age: Number,
  sex: String,
  phone: {
    type: String,
    unique: true,    //唯一的
    required: true   //必须的
  },
  address: String,
  hobby: [String],
  meta: {
    createTime: {
      type: Date,
      default: Date.now()   //默认值
    },
    updateTime: {
      type: Date,
      default: Date.now()   //默认值
    }
  }
})

//创建model对象
/*
  mongoose.model(集合名称， 约束对象)
    - 集合名称 最好是复数形式
 */
var Students = mongoose.model('Students', studentsSchema);

/*
  model对象方法：
    create - Model.create(文档对象，回调函数)  在当前数据库中指定集合内插入一条文档数据
    find - Model.find(查询条件[, 投影], 回调函数)   返回值是一个数组（不管找没找到，都是数组）
           Model.findOne(查询条件[, 投影], 回调函数)  返回值是一个对象
   update - Model.updateOne(查询条件, 要更新的内容[, 配置对象], 回调函数)
            Model.updateMany(查询条件, 要更新的内容[, 配置对象], 回调函数)
   delete - Model.deleteOne(查询条件，回调函数)
            Model.deleteMany(查询条件，回调函数)
 */

/*Students.deleteOne({age: {$lte: 22}}, function (err) {
  if (!err) console.log('数据删除成功');
  else console.log(err);
})*/

/*Students.updateMany({}, {$inc: {age: 1}}, function (err) {
  if (!err) {
    console.log('数据更新成功~~~');
  } else {
    console.log(err);
  }
})*/


Students.find({age: {$gt: 25}}, {name: 1, age: 1, _id: 0}, function (err, data) {
  if (!err) {
    console.log(data);
  } else {
    console.log(err);
  }
})


/*Students.create({
  name: '周文斌',
  age: 20,
  sex: '男',
  address: '宏福苑',
  phone: '1666666666',
  hobby: ['吃吃吃', '睡睡睡']
}, function (err) {
  if (!err) {
    console.log('数据插入成功');
  } else {
    console.log(err);
  }
})*/
