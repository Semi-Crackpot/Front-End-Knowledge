# cookie：https://segmentfault.com/a/1190000012578794

### cookie的作用
1.  存储数据，当用户访问某个网站时，可以通过cookie来向访问者电脑上存储数据
2.  网站为了辨别用户身份、进行session跟踪，而将cookie存储在用户的浏览器上

### cookie是如何工作的？
- 当网页要发送http请求时，浏览器会先检查是否有相应的cookie，有的话，则自动添加在request header中的cookie字段中

### cookie的设置
1.  客户端设置
  ```js
  document.cookie = '名字 = 值';
  document.cookie = '名字 = 值;domain=baike.baidu.com'; // 同时设置了生效域
  ```
2.  服务器端设置：服务器端返回的response header中有一项叫做set-cookie，是专门用来设置cookie的

### cookie的读取、修改和删除
1.  读取：在控制台输入``document.cookie``
2.  修改：在控制台输入``document.cookie='...'``，path/domain要与旧cookie一样，否则只是新增，不是修改
3.  删除：将cookie的过期时间设置成已过去的时间即可

### cookie的属性
