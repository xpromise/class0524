//引入mongoose模块
var mongoose = require('mongoose');
//获取Schema
var Schema = mongoose.Schema;
//创建约束对象
var usersSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  pwd: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  meta: {
    createTime: {
      type: Date,
      default: Date.now()
    },
    updateTime: {
      type: Date,
      default: Date.now()
    }
  }
})

usersSchema.pre('save', function (next) {
  if (!this.isNew) this.meta.updateTime = Date.now();
  next();
})

//创建模型对象
var Users = mongoose.model('Users', usersSchema);

//暴露出去
module.exports = Users;