# Cookie

### 配置中间件cookie-parser
1.  安装：``cnpm i cookie-parser --save``
2.  在入口文件``main.ts``中，引入该中间件并配置
    ```ts
    // 引入
    import * as cookieParser from 'cookie-parser'
    // 配置
    app.use(cookieParser());

### 设置和获取cookie
1.  在控制器中设置路由时，设置cookie，则当进入该路由页面时，自动设置cookie
    ```ts
    @Controller('news')
    export class NewsController {
        @Get()
        // 要通过Response装饰器，装饰方法参数res，再通过res设置cookie
        index(@Response() res) {
            // 设置cookie，name为username，value为zhangsan
            // 后面的对象中设置cookie的其它属性，比如失效时间maxAge与安全性httpOnly
            res.cookie('username', 'zhangsan', {maxAge: 1000*30, httpOnly: true});
            // 使用res参数时，无法使用return返回数据，可以通过res.send()在页面上显示内容
            res.send('这是新闻页面');
            // 注意，使用渲染模板时，仍然可以使用return传递数据给模板文件
        }
    }
2.  在控制器中设置另一个路由时，获取cookie，则当进入该路由页面时，自动获取cookie
    ```ts
    @Controller('user')
    export class UserController {
        @Get()
        // 要通过Request装饰器，装饰方法参数req，再通过req.cookies获取cookie
        getCookie(@Request() req): any {
            // 通过req.cookies.username获取设置的cookie的值
            console.log(req.cookies.username); // zhangsan
            return req.cookies.username;
        }
    }

### cookie加密
1.  配置中间件时，设置加密密钥
    ```ts
    // 加密密钥可以是任意字符串
    app.use(cookieParser('this is signed cookies'));
2.  在设置cookie时，设置属性``signed``的值为true
    ```ts
    res.cookie('username', 'zhangsan', {maxAge: 2000*100, httpOnly: true, signed: true});
3.  在获取cookie时，通过``signedCookies``才能获取到加密过的cookie
    ```ts
    console.log(req.signedCookies.username);

### 