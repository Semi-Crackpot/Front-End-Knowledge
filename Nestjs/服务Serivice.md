# 服务Service

### 服务的作用
1.  封装一些公共的功能，提供给所有控制器使用
2.  定义复杂的业务逻辑，与数据库打交道

### 安装
- 创建服务：``nest g service news``（news是服务的名称）
    - 安装后，自动在src目录下生成news文件夹，文件夹中生成文件``news.service.ts``
    - 并在根模块``app.module.ts``中，自动引入并配置了模块
        ```ts
        // 引入服务
        import { NewsService } from './news/news.service';
        @Module({
            imports: [],
            controllers: [AppController],
            // 配置服务
            providers: [AppService, NewsService],
        })

### 服务文件解析
    ```ts
    // 引入Injectable装饰器
    import { Injectable } from '@nestjs/common';
    // 使用Injectable装饰器，装饰NewsService类
    @Injectable()
    // 导出NewsService类
    export class NewsService {}
    ```

### 封装一些公共的功能，提供给所有控制器使用
1.  在服务中定义方法，返回数据
    ```ts
    @Injectable()
    export class NewsService {
        // 定义方法，返回数据
        findAll(): any {
            return [
                {'title': '新闻111'},
                {'title': '新闻222'}
            ]
        }
    }
2.  在控制器中引入并使用服务，将服务中的数据传递给EJS模板文件
    ```ts
    // 引入服务
    import { NewsService } from './news.service';
    @Controller('news')
    export class NewsController {
        // 使用服务，实例化一个私有对象newsService
        constructor(private newsService: NewsService) {}
        @Get()
        // 渲染EJS模板文件
        @Render('default/news')
        index(): any {
            return {
                // 将服务中方法返回的数据，赋给newsList变量，再传递给EJS模板文件
                newsList: this.newsService.findAll()
            }
        }
    }
3.  在EJS模板文件中，使用传递过来的变量
    ```html
    <ul>
        <% for (let i = 0; i < newsList.length; i++) { %>
            <li>
                <%= newsList[i].title %>
            </li>
        <% } %>
    </ul>

### 




