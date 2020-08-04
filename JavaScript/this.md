# this

### this的指向
1.  函数作为对象的方法被调用，指向该对象
2.  函数作为普通函数被调用，非严格模式下指向window，严格模式下指向undefined
3.  函数作为构造器调用，指向构造器创建的对象
4.  函数作为构造器调用，并显式地返回一个对象，指向这个返回的对象
5.  箭头函数没有单独的this，它的this在创建时确定，指向上一级作用域中的this
6.  可以用call、apply和bind绑定this的指向

### 如果一个函数多次 bind，那么 this 会指向什么
- 会指向第一次 bind 绑定的this
  ```js
  var obj = {
    name: 'lisi',
    run () {
      console.log(this.name);
    }
  }
  var db = {
    name: 'wangwu'
  }
  var example = {
    name: 'zhaoliu'
  }
  obj.run.bind(example).bind(db)() // zhaoliu
  ```
- 注意，只有 bind 可以多次绑定，call 和 apply 不行

### 多种情况下，this的规则优先级
1.  首先是函数作为构造器被调用，指向创建的对象
2.  其次是call、apply和bind，指向第一次bind的对象
3.  然后是作为对象的方法被调用，指向该对象
4.  最后是作为普通函数被调用，指向window

### call、apply 和 bind 的区别
1.  共同点：改变 this 的指向，还能接收参数，把参数传递给被调用的函数
2.  不同点
  - 参数不同：第一个参数都是指向 this 的对象，但第二个参数不相同，apply 传入的是参数的数组，而 call 和 bind 传入多个参数
    ```js
    var func = function(a, b, c) {
      console.log(a, b, c);
    }
    func.apply(null, [1, 2, 3]) // 1 2 3
    func.call(null, 1, 2, 3) // 1 2 3
    func.bind(null, 1, 2, 3)() // 1 2 3
    ```
  - 返回值不同：call 和 apply 都返回函数执行的结果，而 bind 返回函数，所以 bind 后还需要执行函数
3.  使用场景
  - 当明确知道函数接收多少个参数时，使用 call 或 bind
  - 当不关心具体有多少参数传入函数时，使用 apply
  
### 