# NPM命令

### NPM命令
1.  ``npm i``：安装项目所需的所有依赖包
2.  ``npm install 包名``：安装指定包
3.  ``npm uninstall 包名``：卸载指定包
4.  ``npm list``：查看已安装的包
5.  ``npm info 包名``：查看指定包的信息
6.  ``npm install 包名@版本号``：安装指定版本的包
7.  ``npm init``：初始化项目/包，会在项目根目录/包目录下生成``package.json``配置文件

### 配置文件package.json解析
    ```js
    {
        "name": "tools", // 包名
        "version": "1.0.0", // 版本号
        "description": "", // 描述
        "main": "index.js", // 包的入口文件
        "scripts": { // 脚本命令
            "test": "echo \"Error: no test specified\" && exit 1"
        },
        "keywords": [],
        "author": "",
        "license": "ISC"
    }
    ```

### 版本号解析
1.  ^：第一位版本号不变，后面两位取最新
2.  ~：前两位不变，最后一位取最新
3.  *：全部取最新

### 
