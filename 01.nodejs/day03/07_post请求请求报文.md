```
POST http://localhost/ HTTP/1.1
Host: localhost
Connection: keep-alive
Content-Length: 34
Cache-Control: max-age=0
Origin: http://localhost:63342
Upgrade-Insecure-Requests: 1
Content-Type: application/x-www-form-urlencoded
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.84 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
Referer: http://localhost:63342/class0524/01.nodejs/day03/index.html?_ijt=r58eu1qdk37jdph1fkc55nph07
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
Cookie: Webstorm-129da853=8726c2d8-3b88-48b8-8db0-dd82e62fb79a

username=sunwukong&password=123123
```
## post请求的请求报文
* 请求首行
  ```
    POST http://localhost/ HTTP/1.1
  ```
* 请求头
  ```
  Host: localhost
  Connection: keep-alive
  Content-Length: 34
    请求参数的长度
  Cache-Control: max-age=0
  Origin: http://localhost:63342
    请求来源地址
  Upgrade-Insecure-Requests: 1
  Content-Type: application/x-www-form-urlencoded
    请求参数内容的格式
  User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.84 Safari/537.36
  Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
  Referer: http://localhost:63342/class0524/01.nodejs/day03/index.html?_ijt=r58eu1qdk37jdph1fkc55nph07
    请求来源的完整地址（广告的计费）
  Accept-Encoding: gzip, deflate, br
  Accept-Language: zh-CN,zh;q=0.9
  Cookie: Webstorm-129da853=8726c2d8-3b88-48b8-8db0-dd82e62fb79a

  ```
* 空行

* 请求体
  ```
  username=sunwukong&password=123123
    post请求请求参数位于请求体中
  ```
