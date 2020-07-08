# 静态web服务器

### 根据url路径显示静态资源
    ```js
    const http = require('http')
    const fs = require('fs')
    http.createServer((req, res) => {
        var pathname = req.url
        // 设置默认路由
        if (pathname == '/') {
            pathname = '/index.html'
        }
        // 首先排除图标
        if (pathname != '/favicon.ico') {
            // 读取static静态资源目录下的对应文件
            fs.readFile('static' + pathname, (err, data) => {
                // 如果找不到静态资源
                if (err) {
                    // 使用404.html文件
                    fs.readFile('static/404.html', (err, data) => {
                        res.writeHead(200, { 'Content-Type': 'text/html; charset="utf-8"' })
                        res.write(data)
                        res.end()
                    })
                // 如果找得到静态资源，使用对应的静态文件
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html; charset="utf-8"' })
                    res.write(data)
                    res.end()
                }
            })
        }
    }).listen(8081)
    ```

### 获取正确的静态资源文件名
    ```js
    // 导入url模块
    const url = require('url')
    // 解析浏览器地址栏输入的url，pathname就是删除query信息后正确的路径，这个路径对应一个静态资源文件
    var pathname = url.parse(req.url).pathname
    ```

### 改变响应头
- 需求分析：以获取CSS静态文件为例，它的响应头默认是text/html，从而无法渲染
- 解决方案：
    1.  创建一个JSON文件，里面保存不同的后缀名对应的响应头
        ``mime.json``
    2.  封装一个模块``getmime.js``，根据后缀名返回响应头
        ```js
        var obj = {
            // fs参数是fs模块，extname参数是获取到的文件后缀名
            getMime(fs, extname) {
                // 使用同步方法读取JSON文件，注意此处的路径要根据使用该模块的文件来指定
                var data = fs.readFileSync('./Nodejs/mime.json')
                // toString将数据转换成JSON字符串，parse再将其转换成JSON对象
                var Mimes = JSON.parse(data.toString())
                // 返回JSON文件中，后缀名对应的响应头
                return Mimes[extname] || 'text/html'
            }
        }
        // 导出模块
        module.exports = obj
    3.  导入模块，设置响应头
        ```js
        // 导入path模块
        const path = require('path')
        // 导入封装好的模块
        const mimeModel = require('./Nodejs/getmime')
        http.createServer((req, res) => {
            var pathname = url.parse(req.url).pathname
            if (pathname == '/') {
                pathname = '/index.html'
            }
            if (pathname != '/favicon.ico') {
                // 在排除图标后，通过path模块的extname方法，获取路径对应的静态文件的后缀名
                var extname = path.extname(pathname)
                fs.readFile('static' + pathname, (err, data) => {
                    if (err) {
                        fs.readFile('static/404.html', (err, data) => {
                            res.writeHead(200, { 'Content-Type': 'text/html; charset="utf-8"' })
                            res.write(data)
                            res.end()
                        })
                    } else {
                        // 使用封装好的模块中的方法，获取文件后缀名对应的响应头
                        var mime = mimeModel.getMime(fs, extname)
                        // 插入响应头，注意前面是空字符串，中间是响应头变量，后面再拼接一个字符串
                        res.writeHead(200, { 'Content-Type': '' + mime + ';charset="utf-8"' })
                        res.write(data)
                        res.end()
                    }
                })
            }
        }).listen(8081)

### 