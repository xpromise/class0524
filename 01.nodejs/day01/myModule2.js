//定义模块的内容
function sum(arr) {
  return arr.reduce(function (prev, curr) {  //统计
    /*
      prev 上一次的返回值  默认值为0
      curr 当前数组中的值
     */
    return prev + curr;
  })
}
//暴露出去
exports.sum = sum;

/*
exports = {
  sum: sum
}*/
