# 常用API

### 全局配置
- 统一语法：``Vue.config.xxx = true/false``
1.  silent：取消 Vue 所有的日志与警告
  - 默认值：false
2.  devtools：配置是否允许 vue-devtools 检查代码
  - 开发版本默认为 true，生产版本默认为 false
3.  ignoredElements：使 Vue 忽略在 Vue 之外的自定义元素
  - 默认值：[]
4.  keyCodes：给 v-on 自定义键位别名
  - 默认值：{}
5.  performance：在浏览器开发工具的性能/时间线面板中启用对组件初始化、编译、渲染和打补丁的性能追踪
  - 默认值：false
6.  productionTip：设置为 false 以阻止 vue 在启动时生成生产提示
  - 默认值：true

### 全局API
1.  Vue.extend( options )：使用基础 Vue 构造器，创建一个“子类”；参数是一个包含组件选项的对象
  ```js
  // 创建构造器
  var Profile = Vue.extend({
    template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
    data: function () {
      return {
        firstName: 'Walter',
        lastName: 'White',
        alias: 'Heisenberg'
      }
    }
  })
  // 创建 Profile 实例，并挂载到一个元素上
  new Profile().$mount('#mount-point')
  ```
  ```html
  // 要挂载到的元素
  <div id="mount-point"></div>
  ```
2.  Vue.nextTick( [callback, context] )：在下次 DOM 更新循环结束之后执行延迟回调；在修改数据之后立即使用这个方法，获取更新后的 DOM
  ```js
  // 修改数据
  vm.msg = 'Hello'
  // DOM 还没有更新
  Vue.nextTick(function () {
    // DOM 更新了
  })
  // 作为一个 Promise 使用
  Vue.nextTick()
    .then(function () {
      // DOM 更新了
    })
  ```
  - 如果没有提供回调且在支持 Promise 的环境中，则返回一个 Promise
3.  Vue.set( target, propertyName/index, value )：向响应式对象中添加一个 property，并确保这个新 property 同样是响应式的
  - 注意对象不能是 Vue 实例，或者 Vue 实例的根数据对象
4.  Vue.delete( target, propertyName/index )：删除对象的 property。如果对象是响应式的，确保删除能触发更新视图
  - 目标对象不能是一个 Vue 实例或 Vue 实例的根数据对象
5.  Vue.filter( id, [definition] )：注册或获取全局过滤器
  ```js
  // 注册
  Vue.filter('my-filter', function (value) {
    // 返回处理后的值
  })
  // getter，返回已注册的过滤器
  var myFilter = Vue.filter('my-filter')
  ```
6.  Vue.component( id, [definition] )：注册或获取全局组件
  ```js
  // 注册组件，传入一个扩展过的构造器
  Vue.component('my-component', Vue.extend({ /* ... */ }))
  // 注册组件，传入一个选项对象 (自动调用 Vue.extend)
  Vue.component('my-component', { /* ... */ })
  // 获取注册的组件 (始终返回构造器)
  var MyComponent = Vue.component('my-component')
  ```
7.  Vue.use( plugin )：安装 Vue.js 插件。如果插件是一个对象，必须提供 install 方法。如果插件是一个函数，它会被作为 install 方法
  - 该方法需要在调用 new Vue() 之前被调用
  - 当 install 方法被同一个插件多次调用，插件将只会被安装一次
8.  Vue.mixin( mixin )：全局注册一个混入，影响注册之后所有创建的每个 Vue 实例

### 选项/数据
1.  data：Vue 实例的数据对象，在组件中的 data 必须是一个函数
2.  props：props 可以是数组或对象，用于接收来自父组件的数据，可以基于对象的语法使用以下选项：
  - type：prop 的类型
  - default：prop 的默认值
  - required：该 prop 是否是必填项
  - validator：自定义验证函数，会将该 prop 的值作为唯一的参数代入
3.  computed：Vue 实例的计算属性
  - 如果你为一个计算属性使用了箭头函数，则 this 不会指向这个组件的实例
4.  methods：Vue 实例的方法
  - 不应该使用箭头函数来定义 method 函数
  - 因为箭头函数绑定了父级作用域的上下文，所以 this 将不会按照期望指向 Vue 实例
5.  watch：一个对象，键是需要观察的表达式，值是对应回调函数，值也可以是方法名，或者包含选项的对象
  ```js
  var vm = new Vue({
    data: {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
      e: {
        f: {
          g: 5
        }
      }
    },
    watch: {
      a: function (val, oldVal) {
        console.log('new: %s, old: %s', val, oldVal)
      },
      // 方法名
      b: 'someMethod',
      // 该回调会在任何被侦听的对象的 property 改变时被调用，不论其被嵌套多深
      c: {
        handler: function (val, oldVal) { /* ... */ },
        deep: true
      },
      // 该回调将会在侦听开始之后被立即调用
      d: {
        handler: 'someMethod',
        immediate: true
      },
      // 你可以传入回调数组，它们会被逐一调用
      e: [
        'handle1',
        function handle2 (val, oldVal) { /* ... */ },
        {
          handler: function handle3 (val, oldVal) { /* ... */ },
          /* ... */
        }
      ],
      // watch vm.e.f's value: {g: 5}
      'e.f': function (val, oldVal) { /* ... */ }
    }
  })
  vm.a = 2 // => new: 2, old: 1
  ```
  - 不应该使用箭头函数来定义 watcher 函数

### 选项/DOM
1.  template：一个字符串模板作为 Vue 实例的标识使用，模板将会替换挂载的元素
  - 如果 Vue 选项中包含渲染函数，该模板将被忽略
2.  render：字符串模板的代替方案，该渲染函数接收一个 createElement 方法作为第一个参数用来创建 VNode

### 选项/组合
1.  parent：指定已创建的实例之父实例，在两者之间建立父子关系
  - 子实例可以用 this.$parent 访问父实例，子实例被推入父实例的 $children 数组中
  - 节制地使用 $parent 和 $children - 它们的主要目的是作为访问组件的应急方法
  - 更推荐用 props 和 events 实现父子组件通信

### 实例 property
1.  vm.$data：Vue 实例观察的数据对象
2.  vm.$props：当前组件接收到的 props 对象
3.  vm.$el：Vue 实例使用的根 DOM 元素
4.  vm.$options：用于当前 Vue 实例的初始化选项/自定义属性
  ```js
  new Vue({
    customOption: 'foo',
    created: function () {
      console.log(this.$options.customOption) // => 'foo'
    }
  })
  ```
5.  vm.$parent：父实例
6.  vm.$root：当前组件树的根 Vue 实例，如果当前实例没有父实例，此实例将会是其自己
7.  vm.$children：当前实例的直接子组件
  - 需要注意 $children 并不保证顺序，也不是响应式的
  - 考虑使用一个数组配合 v-for 来生成子组件，并且使用 Array 作为真正的来源
8.  vm.$slots：用来访问被插槽分发的内容。每个具名插槽有其相应的 property
  - 例如：v-slot:foo 中的内容将会在 vm.$slots.foo 中被找到
9.  vm.$refs：一个对象，持有注册过 ref 属性的所有 DOM 元素和组件实例

### 实例方法/数据
1.  vm.$watch( expOrFn, callback, [options] )：观察 Vue 实例上的一个表达式或者一个函数计算结果的变化
  - 回调函数得到的参数为新值和旧值
  - 在变更 (不是替换) 对象或数组时，旧值将与新值相同，因为它们的引用指向同一个对象/数组
  - 选项：
    - deep：发现对象内部值的变化，注意监听数组的变更不需要这么做
    - immediate：立即以表达式的当前值触发回调

### 