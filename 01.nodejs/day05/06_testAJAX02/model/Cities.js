//引入mongoose模块
var mongoose = require('mongoose');
//获取Schema
var Schema = mongoose.Schema;
//创建约束对象
var citiesSchema = new Schema({
  code: String,
  province: String,
  city: String,
  county: String,
  name: String,
  level: Number
})

//创建模型对象
var Cities = mongoose.model('Cities', citiesSchema);

//暴露出去
module.exports = Cities;