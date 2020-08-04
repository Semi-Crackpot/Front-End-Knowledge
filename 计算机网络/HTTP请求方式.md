# HTTP请求方式

### HTTP的请求方式
1.  GET：请求指定的页面信息，返回实体主题，请求参数跟在Url后面
2.  POST：向指定资源提交数据进行处理请求，例如提交表单或者上传文件
3.  PUT：从客户端向服务器传送的数据取代指定的文档的内容，类似于POST
4.  DELETE：请求服务器删除指定的页面
5.  OPTIONS：允许客户端查看服务器的性能
6.  HEAD：类似于 GET 请求，只不过返回的响应中没有具体的内容，用于获取报头

### POST请求的数据格式
- 可以使用 Content-type 来指定不同的数据格式
  1.  text/html：HTML格式
  2.  text/plain：纯文本格式
  3.  text/xml：XML格式
  4.  image/gif：Gif图片格式
  5.  image/jpeg：Jpg图片格式
  6.  image/png：Png图片格式
  7.  application/json：JSON数据格式
  8.  application/javascript：js格式
- 还有一种常见的媒体格式是上传文件时使用的
  1.  multipart/form-data：需要在表单中进行文件上传时，要在 form 标签内添加该属性，表示使用该格式

### GET 和 POST 的区别
1.  GET 提交，请求的数据会附在 URL 之后；而 POST 提交，提交的数据放在 HTTP 包中，地址栏不会改变
2.  GET 请求对 URL 长度有限制，传输的数据会受到长度的限制；而 POST 理论上数据不受限
3.  POST 比 GET 的安全性要高，比如通过 GET 提交数据登录时，用户名和密码将明文出现在 URL 上

### 