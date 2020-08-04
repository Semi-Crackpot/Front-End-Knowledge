# JS语法题

1.  以下代码中，x 和 y 分别输出什么？
  ```js
    (function(){
      var x = y = 1
    })()
    console.log(x); // 报错
    console.log(y); // 1
  ```

2.  以下代码中，foo 输出什么？
  ```js
    let foo = {}
    let obj = {}
    foo[obj] = 'hello'
    console.log(foo); // { '[object Object]': 'hello' }
  ```

3.  