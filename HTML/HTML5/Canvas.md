# Canvas

### Canvas绘图过程
1.  首先创建一个canvas标签，并指定宽高
  ```html
  <canvas id="myCanvas" width="600" height="400"></canvas>
  ```
2.  通过js绘图
  ```js
  var canv = document.getElementById('myCanvas')
  var canvas2d =	canv.getContext('2d');
  canvas2d.moveTo(100, 100);  // 线条起始位置
  canvas2d.lineTo(400, 100);  // 线条结束位置
  canvas2d.strokeStyle = '#CD5C5C'    // 线条颜色
  canvas2d.lineWidth = 5   // 定义线宽
  canvas2d.font = '20px Arial'; // 定义字体大小和字体类型
  canvas2d.fillText('Canvas绘图demo', 400, 100)   // 设置绘制的文本和位置
  canvas2d.stroke(); // 执行绘图
  ```

### 什么是SVG？SVG和canvas的区别是什么？
1.  SVG即可缩放矢量图形，它是基于文本的图形语言
2.  区别
    - canvas一般用来绘制动画和游戏，SVG用来绘制小图标和地图
    - canvas绘制的是标量图，与分辨率有关；SVG绘制的是矢量图，与分辨率无关
    - canvas不能为绘制对象绑定事件，而SVG可以
    - canvas不需要记住以后的事情，所以运行更快，SVG需要记录坐标，所以运行较慢
    - canvas绘制图形一般通过js，而SVG通过标签

### 