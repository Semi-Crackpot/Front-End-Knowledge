# Mongoose操作数据库

### 安装和连接数据库
1.  安装：``npm install mongoose --save``
2.  连接数据库
    ```js
    // 引入Mongoose模块
    const mongoose = require('mongoose')
    // CMD开启数据库后，连接数据库，testdata是数据库名称
    mongoose.connect('mongodb://127.0.0.1:27017/testdata', { useNewUrlParser: true, useUnifiedTopology: true })
    // 根据数据库中要操作的表里，每条数据的字段，创建Schema
    var orderSchema = mongoose.Schema({
        order_id: String,
        uid: Number,
        trade_no: String,
        all_price: Number,
        all_num: Number
    })
    // 使用Schema，创建该表的数据模型，Order是模型的名称，order是要操作的表
    var Order = mongoose.model('Order', orderSchema, 'order')
   
### 增删改查
1.  查询数据
    ```js
    Order.find({}, (err, doc) => {
        if (err) {
            console.log(err);
            return
        }
        console.log(doc);
    })
2.  增加数据
    ```js
    var o = new Order({
        order_id: '999',
        uid: 999,
        trade_no: '999',
        all_price: 999,
        all_num: 999
    })
    o.save()
3.  修改数据
    ```js
    // 修改 'order_id' 字段为 '2' 的一条数据，将其 'uid' 字段的值改为10
    Order.updateOne({ 'order_id': '2' }, { 'uid': 10 }, (err, doc) => {
        if (err) {
            console.log(err);
        }
        console.log('成功修改');
    })
4.  删除数据
    ```js
    Order.deleteOne({ 'uid': 10 }, (err, doc) => {
        if (err) {
            console.log(err);
        }
        console.log('成功修改');
    })

### 默认参数
1.  创建Schema时，设置默认参数
    ```js
    var orderSchema = mongoose.Schema({
        order_id: String,
        uid: Number,
        trade_no: String,
        all_price: Number,
        all_num: Number,
        // 默认参数，可以设置数据类型和默认值
        status： {
            type: Number,
            default: 1
        }
    })
2.  增加数据时，如果不传值，则使用默认值

### 预定义修饰符
1.  trim修饰符：去除左右的空格
    - 若不使用trim修饰符，增加数据时，值会保留空格
        ```js
        var o = new Order({
            order_id: '   888   '
        })
        o.save()
    - 在创建Schema时，使用trim修饰符
        ```js
        var orderSchema = mongoose.Schema({
            order_id: {
                type: String,
                trim: true
            }
        })
2.  其它修饰符，网上查

### 自定义修饰符
- 在创建Schema时，设置自定义修饰符
    ```js
    var orderSchema = mongoose.Schema({
        order_id: {
            type: String,
            // 自定义一个修饰符set，修饰符就是一个方法
            // 参数params是增加数据时，传给 order_id 字段的值
            set(params) {
                // 如果传的值是空字符串，直接返回该值
                if (!params) return params
                // 如果传的值包含5
                if (params.indexOf('5') != -1) {
                    // 在5前面加上0
                    return '0' + params
                }
            }
        }
    })

### 索引
1.  在创建Schema时，设置索引
    ```js
    var orderSchema = mongoose.Schema({
        order_id: {
            type: String,
            // 设置索引
            index: true
        }
    })
    // 在添加数据时，就会自动设置索引
2.  还可以设置唯一索引
    ```js
    var orderSchema = mongoose.Schema({
        order_id: {
            type: String,
            // 设置唯一索引
            unique: true
        }
    })

### 封装方法
- 静态方法
    1.  封装方法
        ```js
        // 调用Schema，添加statics修饰符，来封装静态方法
        orderSchema.statics.findByUid = function(uid, cb) {
            this.find({'uid': uid}, (err, docs) => {
                cb(err, docs)
            })
        }
    2.  执行方法
        ```js
        // 调用数据模型Order，来执行方法
        Order.findByUid(10, (err, docs) => {
            if(err) {
                console.log(err)
                return
            }
            console.log(docs)
        })
- 实例方法
    1.  封装方法
        ```js
        // 调用Schema，添加methods修饰符，来封装静态方法
        orderSchema.methods.print = function() {
            console.log('我是实例方法')
        }
    2.  执行方法
        ```js
        // 首先创建数据实例
        var o = new Order({
            order_id: '10'
        })
        // 再通过实例，来调用实例方法
        o.print()

### 数据校验
- 在创建Schema时，对传值进行校验
    ```js
    var orderSchema = mongoose.Schema({
        order_id: {
            type: String,
            // 设置必须传入
            required: true,
            // 字符串的最大长度
            maxLength: 20,
            // 字符串的最小长度
            minLength: 10,
            // 必须符合的正则表达式
            match: /^a(.*)/,
            // 自定义的校验规则，必须符合该规则
            validate: (order_id) => {
                return order_id.length >= 20
            }
        },
        uid: {
            type: Number,
            // 数字的最小长度
            min: 0,
            // 数字的最大长度
            max: 100
        },
        trade_no: {
            type: String,
            // 字符串的传值，只能从数组中选择
            enum: ['0', '1', '2']
        }
    })

### 聚合管道
1.  创建两个表的数据模型
    ```js
    var orderModel = mongoose.model('Order', orderSchema, 'order')
    var orderItemModel = mongoose.model('Order', orderSchema, 'order_item')
2.  实现两个表的关联查询
    ```js
    orderModel.aggregate([
        {
            $lookup: {
                from: 'order_item',
                localField: 'order_id',
                foreignField: 'order_id',
                as: 'items'
            }
        }
    ], (err, docs) => {
            if(err) {
                console.log(err)
                return
            }
            console.log(JSON.stringfy(docs))
        }
    )
3.  获取ObjectId
    ```js
    orderModel.aggregate([
        {
            $lookup: {
                from: 'order_item',
                localField: 'order_id',
                foreignField: 'order_id',
                as: 'items'
            }
        },
        {
            $match: {
                // 获取 ObjectId，需要通过 mongoose.Types
                _id: mongoose.Types.ObjectId('5e678746e87b9c8504d3a76d')
            }
        }
    ], (err, docs) => {
            if(err) {
                console.log(err)
                return
            }
            console.log(JSON.stringfy(docs))
        }
    )
4.  实现多个表的关联查询
    ```js
    orderModel.aggregate([
        // 数组中可以通过多个 $lookup，来关联多个表
        {
            $lookup: {
                from: 'order_item',
                localField: 'order_id',
                foreignField: 'order_id',
                as: 'items'
            }
        },
        {
            $lookup: {
                from: 'order_list',
                localField: 'cid',
                foreignField: '_id',
                as: 'items'
            }
        }
    ], (err, docs) => {
            if(err) {
                console.log(err)
                return
            }
            console.log(JSON.stringfy(docs))
        }
    )

### 使用Populate实现关联查询（不建议使用）
1.  在本表的Schema中，定义要与外表关联的数据
    ```js
    // orderSchema 用于创建 orderModel模型
    var orderSchema = new Schema({
        title: {
            type: String,
            // 与 orderItem模型对应的表的title关联
            ref: 'orderItem' // 对应 orderItem模型
        },
        cid: {
            type: Number,
            // 与 orderList模型对应的表的cid关联
            ref: 'orderList' // 对应orderList模型
        }
    })
    // 注意，ref的值，应该是创建数据模型时， mongoose.model()中的第一个参数，而不是数据库中的表的名称
2.  在进行关联时，要引入关联的所有数据模型，否则无法获取ref的值对应的模型
3.  进行关联查询
    ```js
    orderModel.find({}).populate('title').populate('cid').exec((err, docs) => {
        console.log(docs)
    })

### 