# 控制器Controller

### 控制器的作用
1.  配置路由

### 安装
- ``nest g controller article`` (article是控制器的名称)
    - 安装后，自动生成控制器目录``src/article``，目录下含控制器文件``article.controller.ts``
    - 并在根模块``app.module.ts``文件中，自动引入该控制器

### 控制器文件解析
    ```js
    // 引入Controller装饰器
    import { Controller } from '@nestjs/common';
    // 使用Controller装饰器，装饰ArticleController类
    @Controller('article')
    // 实现并导出ArticleController类
    export class ArticleController {}
    ```

### 配置路由
1.  匹配路由
    ```ts
    // 所有路由页面首先包含路由/article
    @Controller('article')
    export class ArticleController {
        // 匹配路由/article
        // HTTP请求使用Get方法
        @Get()
        // 路由匹配成功后执行的方法
        index() {
            // 在路由页面显示的内容
            return '我是一个article页面'
        }
        // 匹配路由/article/add
        @Get('add')
        addArticle() {
            return '增加article'
        }
    }
2.  获取Get方法的传值
    - 方法一
        ```ts
        @Get('add')
        // 使用方法参数装饰器Query，query就是Get方法的传值
        addArticle(@Query() query) {
            // 打印出来的query是一个对象
            console.log(query);
            return '增加article'
        }
    - 方法二
        ```ts
        @Get('add')
        // 使用方法参数装饰器Request，req是url传过来的信息，req.query才是Get方法的传值
        addArticle(@Request() req) {
            // 打印出来的req.query是一个对象
            console.log(req.query);
            return '增加article'
        }
3.  获取Post方法的传值
    ```ts
    @Post('edit')
    // 使用方法参数装饰器Body，body就是Post方法的传值
    editArticle(@Body() body) {
        // 打印出来的body是一个对象
        console.log(body);
        return '修改article'
    }
4.  获取动态路由的传值
    ```ts
    // 配置动态路由，匹配所有 /article/id（id可以是任何内容） 的路由
    @Get(':id')
    // 使用方法参数装饰器Param，param就是id对应的动态路由
    getArtile(@Param() param) {
        // 打印出来的param是一个对象，key就是id，value就是对应的动态路由
        console.log(param);
        return '动态article'
    }
5.  获取传值中指定的值：例如?name=wyz&id=3中，获取id对应的值3
    ```ts
    @Get('add')
    // 使用Query装饰器时，传入参数'id'，此时id就是传值中id对应的值
    addArticle(@Query('id') id) {
        console.log(id);
        return '增加article'
    }
6.  路由的模糊匹配
    ```ts
    // *匹配至少0个任意字符
    @Get('a*a')
    index() {
        return '我是一个article页面'
    }
7.  实现路由跳转
    ```ts
    @Post('doSomething')
    doSomething(@Response() res) {
        // 使用redirect方法，跳转到对应路由
        res.redirect('/')
    }

### 
