# Object.defineProperty

### Object.defineProperty的语法
1.  Object.defineProperty 的作用，就是直接在一个对象上定义一个新属性，或修改一个已经存在的属性
2.  语法：``Object.defineProperty(obj, prop, desc)``
  - obj：定义属性的当前对象
  - prop：需要定义的属性名
  - desc：属性描述符

### 属性描述符
1.  数据描述符：拥有两个特有属性
  ```js
  let obj = {}
  Object.defineProperty(obj, 'name', {
    value: 'zhangsan', // 属性的值
    writable: true // 属性是否可改变值
  })
  ```
2.  存取描述符：由一对 getter、setter 函数功能来描述的属性
  ```js
  let obj = {}
  let temp = null
  Object.defineProperty(obj, 'name', {
    get () {
      return temp
    },
    set (val) {
      temp = val
    }
  })
  obj.name = 'zhangsan'
  console.log(obj.name);
  ```
3.  两种描述符通用的属性
  - configurable：属性是否可配置，是否可删除
  - enumerable：属性是否会出现在对象的枚举属性中，即可以在 for in 或者 Object.keys() 遍历

### = 和 Object.defineProperty 定义属性的不同
1.  使用 = 定义属性，相当于属性描述符的默认值都是 true
  ```js
  let obj = {}
  // 使用 = 定义属性
  obj.name = 'zhangsan'
  // 等同于
  Object.defineProperty(obj, 'name', {
    value: 'zhangsan',
    writable: true,
    configurable: true,
    enumerable: true
  })
  ```
2.  使用 Object.defineProperty 定义属性，相当于属性描述符的默认值都是 false

### 