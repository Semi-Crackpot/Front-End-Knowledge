# Mongoose操作MongoDB

### 安装和配置
1.  安装：``cnpm install @nestjs/mongoose mongoose --save``
2.  在根模块``app.module.ts``中，配置数据库的连接
    ```ts
    // 引入MongooseModule模块
    import { MongooseModule } from '@nestjs/mongoose'
    @Module({
        imports: [
            // 连接到MongoDB的koa数据库
            MongooseModule.forRoot('mongodb://127.0.0.1:27017/koa')
        ]
    })
3.  在``src/schema``目录下的文件中，配置并导出每个集合对应的Schema，建议文件名为``集合名.schema.ts``
    ```ts
    import * as mongoose from 'mongoose';
    export const userSchema = new mongoose.Schema({
        name: String,
        age: Number
    })
4.  在要操作数据库的控制器，对应的模块文件中，配置数据模型
    ```ts
    import { MongooseModule } from '@nestjs/mongoose';
    import { userSchema } from '../../schema/user.schema'
    @Module({
        imports: [
            // 参数是一个数组，里面每个对象都是要配置的数据模型，多个对象即配置多个数据模型
            MongooseModule.forFeature([
                {
                    // 数据模型的名称，建议首字母大写
                    name: 'User',
                    // 使用的Schema
                    schema: userSchema,
                    // 操作的集合的名称
                    collection: 'user'
                }
            ])
        ]
    })
5.  在服务中，定义数据库操作的方法
    ```ts
    // 引入InjectModel装饰器
    import { InjectModel } from '@nestjs/mongoose'
    @Injectable()
    export class NewsService {
        // 使用装饰器，实例化数据模型的私有变量，User是上一步中数据模型的名称
        constructor(@InjectModel('User') private userModel) {}
        // 定义查询数据的方法
        async findAll() {
            // 通过数据模型的find()方法，来实现所有数据的查询
            // 数据库的查询操作是异步方法，需要通过 await 来接收异步得到的数据，并在后面调用exec()
            const res = await this.userModel.find().exec();
            // 返回查询到的数据
            return res;
        }
    }
6.  在控制器中，引入服务，使用服务中定义的方法，当进入路由页面时，执行数据库操作
    ```ts
    import { NewsService } from '../../service/news/news.service'
    @Controller('admin/news')
    export class NewsController {
        constructor(private newsService: NewsService) {}
        @Get()
        async index() {
            // 服务中定义的方法也是异步方法，所以仍然使用 await 来接收异步操作获取的数据
            const res = await this.newsService.findAll();
            // 在路由页面上，显示查询到的数据
            return res;
        }
    }


### 实现数据库的增删改查
1.  查询
    ```ts
    export class NewsService {
        constructor(@InjectModel('User') private userModel) {}
        // 调用方法时，可以传入参数json，指定查询范围，默认值{}表示查询全部数据
        // 还可以传入可选参数fields，来指定查询结果显示哪些字段
        async findData(json = {}, fields?: string) {
            // 将参数json和fields传入数据模型的find()方法中
            const res = await this.userModel.find(json, fields).exec();
            return res;
        }
    }
2.  添加
    ```ts
    // 添加的数据，必须实现User接口
    async addData(json: User) {
        // 实例化数据模型，得到进行添加数据操作的对象
        const user = new this.userModel(json);
        // 调用添加数据的方法save()，赋给变量res，这一句实质上已经完成了添加数据的操作
        const res = await user.save();
        return res;
    }
    ```
    ```ts
    @Get('add')
    async doAdd() {
        // 当await后面的语句执行时，已经完成了数据的添加
        const res = await this.newsService.addData({age: 20});
        // 在路由页面上，显示添加的数据
        return res;
    }
3.  修改数据
    ```ts
    // 修改数据时，需要传入2个参数
    async updateData(json1: User, json2: User) {
        const res = await this.userModel.updateOne(json1, json2);
        return res;
    }
    ```
    ```ts
    @Get('update')
    async doUpdate() {
        const res = await this.newsService.updateData(
            {
                'name': 'zhangsan'
            },
            {
                'name': 'wangwu'
            }
        )
        // 在路由页面上，显示修改是否成功的信息
        return res;
    }
4.  删除
    ```ts
    async deleteData(json: User) {
        const res = await this.userModel.deleteOne(json);
        return res;
    }
    ```
    ```ts
    @Get('delete')
    async doDelete() {
        const res = await this.newsService.deleteData({'name': 'wangwu'})
        // 在路由页面上，显示删除是否成功的信息
        return res;
    }

### 使用接口，来约束方法中传入的参数类型
1.  安装接口：``nest g interface interface/user``，接口文件在src/interface目录下
2.  在接口文件中，定义接口，并导出
    ```ts
    export interface User {
        name: string;
        age: number;
    }
3.  在方法中，引入接口，约束参数
    ```ts
    import { User } from '../../../../interface/user.interface'
    @Injectable()
    export class NewsService {
        constructor(@InjectModel('User') private userModel) {}
        // 调用方法时，传入的参数必须实现接口User
        async findData(json: User) {
            const res = await this.userModel.find(json).exec();
            return res;
        }
    }
4.  在控制器中调用方法时，传入的参数必须实现接
    ```ts
    @Get()
    async index() {
        // 参数必须是一个对象，并且拥有属性name和age
        const res = await this.newsService.findData({name: 'wangwu', age: 20});
        return res;
    }
5.  接口中要求的属性，可以定义为可选的
    ```ts
    export interface User {
        // 此时name是可选属性，传值时可以不传入name
        name?: string;
        age: number;
    }

### 