# 非阻塞IO

### 什么是非阻塞IO？
- 非阻塞IO也叫做异步，Nodejs中的模块操作都涉及到非阻塞IO
    ```js
    // 以下代码的打印顺序是1 -> 3 -> 2
    console.log(1);
    // 因为Nodejs中的模块操作都是异步操作
    fs.readFile('./data.txt', (err, data) => {
        console.log(2);
    })
    console.log(3);

### 非阻塞IO带来的问题
- 无法获取异步方法中的数据
    ```js
    function getData() {
        fs.readFile('./data.txt', (err, data) => {
            return data
        })
    }
    console.log(getData()); // undefined，因为打印时，文件还未读取

### events模块：解决非阻塞IO的问题
- events模块的作用：进行事件驱动，发出广播事件，监听广播事件
    ```js
    // 导入events模块
    const events = require('events')
    // 创建事件发送实例
    var eventEmitter = new events.EventEmitter()
    // 监听广播事件something
    eventEmitter.on('something', (data) => {
        console.log('接收到了广播事件');
        // 打印监听到的数据
        console.log(data);
    })
    // 2秒后
    setTimeout(() => {
        // 发送广播事件something和广播数据
        eventEmitter.emit('something', '发送的数据')
    }, 2000)
- events模块：解决异步方法中的数据无法获取的问题
    ```js
    const fs = require('fs')
    const events = require('events')
    var eventEmitter = new events.EventEmitter()
    function getData() {
        fs.readFile('./data.txt', (err, data) => {
            eventEmitter.emit('data', data)
        })
    }
    getData()
    eventEmitter.on('data', (data) => {
        console.log(data.toString());
    })

### 