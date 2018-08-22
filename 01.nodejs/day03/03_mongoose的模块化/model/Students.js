/*
  此模块用来创建模型对象 model
 */
var mongoose = require('mongoose');
//获取schema
var Schema = mongoose.Schema;
//创建约束对象
var stuSchema = new Schema({
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

stuSchema.pre('save', function (next) {
  if (!this.isNew) {
    this.meta.updateTime = Date.now();
  }
  next();
})

//创建模型对象
var Students = mongoose.model('Students', stuSchema);

//暴露出去
module.exports = Students;