# Rest参数

### Rest 参数是什么？
1.  Rest 参数接受函数的多余参数
2.  Rest 参数是一个数组
3.  将 Rest 参数放在形参的最后
  ```js
  function func(a, b, ...rest) {
    ...
  }
  ```

### Rest 参数和 arguments 参数的区别
1.  rest 参数只包括那些没有给出名称的参数，arguments 包含所有参数
2.  arguments 对象不是真正的数组，而rest 参数是数组实例，可以直接使用数组方法

### Rest 参数的解构赋值
- Rest 参数是一个数组，所以解构赋值时，要写成数组的形式
  ```js
  function f(...[a, b, c]) {  
    return a + b + c;  
  }  
  f(1)          // NaN 因为只传递一个值，其实需要三个值  
  f(1, 2, 3)    // 6  
  f(1, 2, 3, 4) // 6 (第四值没有与之对应的变量名)
  ```

### 