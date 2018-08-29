

function getNews(url) {
  console.log(`请求地址：${url}`);
  return 'newsData';
}

function getComments(url) {
  console.log(`请求地址：${url}`);
  return 'commentsData';
}
//对象的简写方式
module.exports = {
  getNews,
  getComments
}