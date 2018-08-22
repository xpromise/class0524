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
//监听文档对象的save方法
studentsSchema.pre('save', function (next) {
  //this指代着当前文档对象
  if (!this.isNew) {
    this.meta.updateTime = Date.now();
  }
  next(); //调用堆栈中下一个中间件
})

//创建model对象
/*
  mongoose.model(集合名称， 约束对象)
    - 集合名称 最好是复数形式
 */
var Students = mongoose.model('Students', studentsSchema);

Students.findOne({}, function (err, data) {
  if (!err) {
    data.age = 23;
    data.save(function (err) {
      if (!err) console.log('数据保存成功');
      else console.log(err);
    });
  } else {
    console.log(err);
  }
})
