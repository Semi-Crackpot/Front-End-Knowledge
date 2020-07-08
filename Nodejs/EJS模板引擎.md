# EJS模板引擎

### 什么是EJS模板引擎？
- 渲染数据库和文件读取到的数据，显示到HTML页面上

### 基本使用
- 安装：``npm install ejs --sava``
- 导入：``const ejs = require('ejs')``

### 渲染文件
1.  创建ejs模板文件：``login.ejs``
2.  渲染该文件
    ```js
    // 导入ejs模块
    const ejs = require('ejs')
    const http = require('http')
    const url = require('url')
    http.createServer((req, res) => {
        res.writeHead(200, { 'Content-type': 'text/html; charset = "utf-8"' });
        var pathname = url.parse(req.url).pathname
        if (pathname == '/login') {
            // 使用ejs渲染文件，第一个参数是文件路径
            // 第二个参数是要渲染的数据
            ejs.renderFile('./login.ejs', {}, (err, data) => {
                // data是EJS模板文件中的内容，如果不渲染数据，则只渲染EJS文件中的内容
                res.end(data)
            })
        }
    }).listen(8081)

### 渲染数据
1.  创建ejs模板文件：``login.ejs``
2.  创建数据，并赋给渲染数据
    ```js
    http.createServer((req, res) => {
        res.writeHead(200, { 'Content-type': 'text/html; charset = "utf-8"' });
        var pathname = url.parse(req.url).pathname
        // 创建数据
        var data = '这是后台数据'
        if (pathname == '/login') {
            ejs.renderFile('./login.ejs', {
                    // 将创建的数据赋给渲染数据，该数据可以在EJS渲染文件中使用
                    msg: data
                },
                (err, data) => {
                    res.end(data)
                })
        }
    }).listen(8081)
3.  在EJS模板文件``login.ejs``中，使用渲染数据
    ```html
    <body>
        <h2>EJS模板</h2>
        <h2>
            <!-- 使用渲染数据 -->
            <%= msg %>
        </h2>
    </body>

### EJS渲染数据常用标签
1.  ``<%= %>``：原文输出HTML标签
2.  ``<%- %>``：解析HTML标签并输出
3.  ``<% %>``：流程控制标签
    ```html
    <ul>
        <% for (let i = 0; i < list.length; i++) { %>
            <li>
                <%= list[i] %>
            </li>
        <% } %>
    </ul>

### 