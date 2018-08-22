```
GET http://localhost/ HTTP/1.1
Host: localhost
Connection: keep-alive
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.84 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9


```
## get请求的请求报文
* 请求首行
  ```
    GET http://localhost/ HTTP/1.1
      请求方式 请求的地址（协议名://域名/） 协议/协议版本号
  ```
* 请求头的信息
  ```
   Host: localhost
      主机名
   Connection: keep-alive
      保持长连接
   Cache-Control: max-age=0
      缓存控制
   Upgrade-Insecure-Requests: 1
      允许使用https协议
   User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.84 Safari/537.36
      用户代理：浏览器内核版本
   Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
      浏览器可以接受文件格式/数据类型    q=0.9优先级，默认优先级1
   Accept-Encoding: gzip, deflate, br
      可接受文件的压缩格式
   Accept-Language: zh-CN,zh;q=0.9
      可接受的语言
  ```
* 空行
  
* 请求体（get请求没有请求体）