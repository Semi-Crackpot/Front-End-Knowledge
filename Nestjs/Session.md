# Session

### 配置中间件express-session
1.  安装中间件：``cnpm i express-session --save``
2.  在入口文件``main.ts``中引入并配置
    ```ts
    // 引入
    import * as session from 'express-session';
    // 配置
    app.use(session({
        secret: 'keyboard cat',
        cookie: { maxAge: 6000 }
    }))

### 设置和获取session
1.  在控制器设置路由时，设置session，则当进入该路由页面时，自动设置session
    ```ts
    @Get('session')
    // 使用Request装饰器，装饰方法参数req，再通过req设置session
    setSession(@Request() req): string {
        // 通过req.session来设置session
        req.session.username = 'lisi';
        return '设置session'
    }
    // 注意，设置session之后，在浏览器只能看到保存的cookie
    // 因为session保存在服务器，而cookie保存在浏览器
    // 浏览器通过保存的cookie，到服务器中才能取得正确的session
2.  在控制器设置另一个路由时，获取session，则当进入该路由页面时，自动获取cookie
    ```ts
    @Get('userinfo')
    // 使用Request装饰器，装饰方法参数req，再通过req获取session
    getSession(@Request() req): string {
        // 通过req.session.username来获取设置好的cookie
        console.log(req.session.username); // lisi
        return req.session.username;
    }

### 配置中间件时的参数解析
1.  secret：密钥
2.  cookie：保存在浏览器中，用来获取服务器中的session
3.  rolling：每次获取session时，都重置cookie的失效时间，以免session失效

### 