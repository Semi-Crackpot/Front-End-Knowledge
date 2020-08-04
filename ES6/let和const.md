# let 和 const

### var、let 和 const 声明变量的区别是什么？
1.  全局声明的 var 变量会挂载在 window 上，let 和 const 不会
2.  var 作用于函数作用域，let 和 const 作用于块级作用域
3.  var 可以声明同名变量，let 和 const 不可以
4.  let 和 const 存在暂时性死区，var没有
5.  var 声明存在变量提升，let 和 const 不会
6.  const 一旦声明必须赋值，声明后不能再修改

### const的本质是什么？
1.  const不保证变量的值不得改动，而是变量指向的那个内存地址不得改动
2.  对于值类型的数据（数字、字符串、布尔值），值就保存在变量指向的内存地址，因此是常量
3.  但对于引用型数据（对象、数组），变量指向的内存地址只是一个指针，const只能保证这个指针不变，但指针指向的数据结构可变

### 如何让 const 声明的变量完全不能修改？
1.  const 声明的对象或数组，仍然可以改变其属性
  ```js
  const obj = {}
  obj.name = 'zhangsan'
  console.log(obj); // { name: 'zhangsan' }
  ```
2.  使用 Object.freeze() 来冻结对象本身以及对象的属性
  ```js
  var constantize = (obj) => {
    Object.freeze(obj);
    Object.keys(obj).forEach((key, index) => {
      if (typeof obj[key] === 'object') {
        constantize(obj[key]);
      }
    });
  };
  ```
3.  冻结后，对象或数组就无法再改变属性
  ```js
  const obj = {}
  constantize(obj)
  obj.name = 'zhangsan'
  console.log(obj); // {}
  ```

### 