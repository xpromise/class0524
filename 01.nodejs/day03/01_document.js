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

Students.findOne({}, function (err, data) {
  if (!err) {
    console.log(data); //文档对象
    /*
      document.id
      document._id
      document.updateOne(更新的内容，回调函数) 更新文档对象
      document.save(回调函数) 保存文档对象
      document.isNew 标识当前文档对象是否是新的（是否又被修改过）
     */
    console.log(data.id, data._id);
    /*data.updateOne({$set: {age: 21}}, function (err) {
      if (!err) console.log('数据修改成功·~');
      else console.log(err);
    })*/
    /*data.age = 22;
    data.save(function (err) {
      if (!err) console.log('数据保存成功');
      else console.log(err);
    });*/
    console.log(data.isNew);
    
  } else {
    console.log(err);
  }
})
