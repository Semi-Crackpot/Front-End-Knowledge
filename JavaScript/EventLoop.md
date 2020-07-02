# EventLoop

### 为什么JavaScript是单线程？怎么实现多线程？
1.  JavaScript的单线程，与它的用途有关。作为浏览器脚本语言，JavaScript的主要用途是与用户互动，以及操作DOM。这决定了它只能是单线程，否则会带来很复杂的同步问题。比如，假定JavaScript同时有两个线程，一个线程在某个DOM节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准？所以，为了避免复杂性，从一诞生，JavaScript就是单线程，这已经成了这门语言的核心特征，将来也不会改变。
2.  实现多线程：使用Worker类
    ```js
    // 申请一个线程，来单独执行某个JS文件
    var worker = new Worker(js文件路径)
    // 关闭worker线程
    worker.terminate()
    ```
    - 子线程完全受主线程控制，且不得操作DOM。所以，这个方法并没有改变JavaScript单线程的本质

### Event Loop：https://zhuanlan.zhihu.com/p/41543963

### 执行栈
- 当一系列的方法被依次调用时，js会先解析这些方法，把其中的同步任务按照执行顺序排队到一个地方，这个地方叫做执行栈

### 事件队列
- 当遇到异步任务时，js会将异步任务挂起，等异步任务返回结果后，再按照顺序排列到一个地方，这个地方叫做事件队列

### Event Loop流程
1.  js从上到下解析方法，将其中的同步任务按照执行顺序排列到执行栈中
2.  当程序调用外部的API时，比如ajax、setTimeout等，会将此类异步任务挂起，继续执行执行栈中的同步任务，等异步任务返回结果后，再按照执行顺序排列到事件队列中
3.  主线程先将执行栈中的同步任务清空，然后检查事件队列中是否有任务，如果有，就将第一个事件对应的回调推到执行栈中执行，若在执行过程中遇到异步任务，则继续将这个异步任务排列到事件队列中
4.  主线程每次将执行栈清空后，就去事件队列中检查是否有任务，如果有，就每次取出一个推到执行栈中执行，这个过程是循环往复的

### 宏任务与微任务
- 异步任务分为两类：
    - 宏任务：setTimeout，setInterval，setImmediate，I/O(磁盘读写或网络通信)，UI交互事件
    - 微任务：process.nextTick，Promise.then
- 宏任务与微任务的执行流程
    - 当执行栈中的任务清空，主线程会先检查微任务队列中是否有任务，如果有，就将微任务队列中的任务依次执行，直到微任务队列为空，之后再检查宏任务队列中是否有任务，如果有，则每次取出第一个宏任务加入到执行栈中，之后再清空执行栈，检查微任务，以此循环
- 同一次事件循环中，微任务永远在宏任务之前执行

### Event Loop示例
```js
    console.log(1);
        
    setTimeout(() => {
        console.log('setTimeout');
    }, 0);

    let promise = new Promise(resolve => {
        console.log(3);
        resolve();
    }).then(data => {
        console.log(100);
    }).then(data => {
        console.log(200);
    });
        
    console.log(2);
```
- 输出结果：
    1 3 2 100 200 setTimeout
- 解析：
    1.  遇到同步任务，输出1
    2.  遇到宏任务setTimeout，先放到宏任务队列
    3.  Promise中的语句是立即执行的，输出3
    4.  Promise.then是微任务，放到微任务队列
    5.  遇到同步任务，输出2
    6.  清空微任务队列，输出100，200
    7.  清空宏任务队列，输出setTimeout

### Promise的执行顺序
1.  Promise本身是同步的立即执行函数
2.  当遇到`resolve`时，将参数传给.then，接着执行Promise剩余的语句
3.  当遇到`reject`时，Promise剩余的语句都不再执行，直接去执行.catch
4.  `resolve`和`reject`只有第一次执行有效
5.  promise有3种状态：pending、fulfilled 或 rejected，状态改变只能是`pending->fulfilled`或者`pending-> rejected`，状态一旦改变则不能再变
```js
    console.log('script start')
    let promise1 = new Promise(function (resolve) {
        console.log('promise1')
        resolve()
        console.log('promise1 end')
    }).then(function () {
        console.log('promise2')
    })
    setTimeout(function(){
        console.log('settimeout')
    })
    console.log('script end')
```
- 输出顺序: 
    script start -> promise1 -> promise1 end -> script end -> promise2 -> settimeout

### 关于 setTimeOut、setImmediate、process.nextTick()的比较 
1.  setTimeout()
    - 将事件插入到了事件队列，必须等到当前代码（执行栈）执行完，主线程才会去执行它指定的回调函数。
2.  setImmediate()
    - 事件插入到事件队列尾部，主线程和事件队列的函数执行完成之后立即执行。和setTimeout(fn,0)的效果差不多。
3.  process.nextTick()
    - 插入到事件队列尾部，但在下次事件队列之前会执行。也就是说，它指定的任务总是发生在所有异步任务之前，当前执行栈的末尾。

### async和await的执行顺序
1.  async返回的是一个Promise，所以它本身是同步的立即执行函数
2.  执行中遇到await时，需要等待await后的函数执行完成并且有了返回结果，才能继续执行
3.  await后面的函数或语句，如果有返回值的话，会包装成Promise.resolve(返回值)，等第4步执行完，再来执行这个resolve函数
    - 如果await后的函数中包含输出语句，或await后的语句是输出语句，则会直接执行，再接着执行第4步
4.  执行await后的函数时，跳出了async函数体，所以接下去并不是继续执行async中的剩余语句，而是从调用async函数的语句处，接着往下执行
5.  在执行完await后，会将async中的await语句下面的语句加入到微任务队列
```js
    async function async1(){
        console.log('async1 start');
        await async2();
        console.log('async1 end')
    }
    async function async2(){
        console.log('async2')
    }

    console.log('script start');
    async1();
    console.log('script end')
```
- 输出顺序：
    script start -> async1 start -> async2 -> script end -> async1 end

### 面试真题
```javascript
    async function a1 () {
        console.log('a1 start')
        await a2()
        console.log('a1 end')
    }
    async function a2 () {
        console.log('a2')
    }
    console.log('script start')

    setTimeout(() ={
        console.log('setTimeout')
    }, 0)

    Promise.resolve().then(() ={
        console.log('promise1')
    })

    a1()

    let promise2 = new Promise((resolve) ={
        resolve('promise2.then')
        console.log('promise2')
    })

    promise2.then((res) ={
        console.log(res)
        Promise.resolve().then(() ={
            console.log('promise3')
        })
    })
    console.log('script end')
```
- 输出顺序：
- 解释：
1.  遇到`console.log('script start')`，输出**script start**
2.  遇到`setTimeout(() ={console.log('setTimeout')}, 0)`，加入到宏任务队列
3.  遇到`Promise.resolve().then(() ={console.log('promise1')})`，加入到微任务队列
4.  执行`a1()`，输出**a1 start**，执行await后的`a2()`，输出**a2**
5.  执行完await后，将`console.log('a1 end')`加入到微任务队列，跳出`a1()`
6.  把`promise2.then`传给.then，接着输出**promise2**，将`promise2.then`加入到微任务队列
7.  输出**script end**
8.  开始清空微任务队列，输出**promise1**，接着输出**a1 end**
9.  执行`promise2.then`，输出**promise2.then**，将`console.log('promise3')`加入到微任务队列
10. 因为微任务队列没有其它任务了，输出**promise3**
11. 开始清空宏任务队列，输出**setTimeout**，结束