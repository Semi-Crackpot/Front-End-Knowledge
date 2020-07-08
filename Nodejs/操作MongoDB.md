# 操作MongoDB

### 安装和导入模块
- 安装：``npm install mongodb --save-dev``
- 导入：``const mongoClient = require('mongodb').MongoClient``

### 获取数据库
1.  开启MongoDB，连接到本地MongDB数据库：``connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb``
2.  获取MongoDB的路径：``const url = 'mongodb://127.0.0.1:27017/'``
3.  Nodejs连接MongoDB，获取MongoDB中的数据库
    ```js
    // 第一个参数是MongoDB的路径
    // 第二个参数是配置选项，是否使用新的URL解析方式
    // 第三个参数是回调函数，db就是连接到的MongoDB
    mongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
        if (err) {
            console.log(err);
        }
        // 获取MongoDB中的testdata数据库
        var dbo = db.db('testdata')
    }

### 插入数据
- 插入一条数据
    ```js
    // 操作数据库的test集合
    dbo.collection('test').insertOne({
            'name': 'lisi',
            'age': 25
        },
        (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log('成功');
            // 操作完成后，关闭数据库
            db.close()
        }
    )
- 插入多条数据
    ```js
    dbo.collection('test').insertMany([{
                'name': 'lisi',
                'age': 25
            },
            {
                'name': 'zhangsan',
                'age': 30
            }
        ],
        (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log('成功');
            db.close()
        }
    )

### 查询数据
    ```js
    // 使用toArray将查询的数据放在数组里
    dbo.collection('test').find({}).toArray((err, result) => {
        if (err) {
            console.log(err);
        }
        console.log(result);
        db.close()
    })
    ```

### 更新数据
- 更新一条数据
    ```js
    // 要更新的数据
    var whereStr = { 'name': 'lisi' }
    // 更新后的数据，如果更新的属性相同，则直接修改值；如果更新的属性不同，则添加新的属性
    var updateStr = { $set: { 'url': 'baidu.com' } }
    dbo.collection('test').updateOne(whereStr, updateStr, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log('更新成功');
        db.close()
    })
- 更新多条数据
    ```js
    // 对所有数据进行更新
    var whereStr = {}
    var updateStr = { $set: { 'email': 'yahoo@com' } }
    dbo.collection('test').updateMany(whereStr, updateStr, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log('更新成功');
        db.close()
    })

### 删除数据
- 删除一条数据
    ```js
    // 要删除的数据
    var whereStr = { 'name': 'lisi' }
    dbo.collection('test').deleteOne(whereStr, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log('删除成功');
        db.close()
    })
- 删除多条数据
    ```js
    var whereStr = { 'url': 'baidu.com' }
    dbo.collection('test').deleteMany(whereStr, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log('删除成功');
        db.close()
    })

### 排序
    ```js
    // 定义排序规则：此处按age的值进行降序排序
    var mySort = { 'age': -1 }
    // 先使用find()找到所有数据，再使用sort()进行排序
    dbo.collection('test').find().sort(mySort).toArray((err, result) => {
        if (err) {
            console.log(err);
        }
        console.log(result);
        db.close()
    })
    ```

### 查询的限制条件
- 限制查询的条数
    ```js
    // 限制查询2条数据
    dbo.collection('test').find().limit(2).toArray((err, result) => {
        if (err) {
            console.log(err);
        }
        console.log(result);
        db.close()
    })
- 限制从第几条开始查询
    ```js
    // 限制从第3条开始查询
    dbo.collection('test').find().skip(2).toArray((err, result) => {
        if (err) {
            console.log(err);
        }
        console.log(result);
        db.close()
    })

### 删除集合
    ```js
    // delOK是删除成功的boolean返回值，成功时为true，失败时为false
    dbo.collection('test').drop((err, delOK) => {
        if (err) {
            console.log(err);
        }
        if (delOK) {
            console.log('删除成功');
        }
        db.close()
    })
    ```

### 