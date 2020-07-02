# BFC

### 什么是BFC？
- BFC是块格式化上下文

### BFC的创建方法
1.  根元素
2.  浮动元素（float不为none）
3.  绝对定位元素（position为absolute或fixed）
4.  行内块元素（display为inline-block）
5.  表格单元格（display为table-cell）
6.  overflow不为visible的元素
7.  弹性盒子（display为flex或inline-flex）

### BFC的约束规则
1.  内部的Box会在垂直方向上一个接一个的放置
2.  属于同一个BFC的两个相邻Box的margin会重叠
3.  计算BFC的高度时，浮动的子元素也参与运算
4.  BFC是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面，反之亦然
5.  BFC的区域不会与浮动的Box重叠

### BFC的作用
1.  不和浮动元素重叠
  ```html
  <div class="left"></div>
  <div class="right"></div>
  ```
  ```css
  .left {
    width: 200px;
    height: 200px;
    background-color: red;
    float: left; // 左边的元素浮动，原本应该覆盖在右边的元素上面
  }
  .right {
    width: 300px;
    height: 300px;
    background-color: black;
    overflow: hidden; // 给右边元素设置BFC，则不会与浮动元素重叠
  }
  ```
2.  清除元素内部浮动（解决父元素高度塌陷）
  ```html
  <div class="box">
    <div class="inner-box"></div>
  </div>
  ```
  ```css
  .box {
    // 当父元素不设置高度时，本来应该被子元素的高度撑起来
    width: 300px;
    border: 1px solid red;
    // 给父元素设置BFC，计算BFC的高度时，浮动的子元素也参与运算
    overflow: hidden;
  }
  .inner-box {
    width: 100px;
    height: 100px;
    background-color: black;
    // 但子元素设置了浮动，无法撑起父元素的高度
    float: left;
  }
  ```
3.  防止margin重叠
  - // 两个元素都处于body元素中，即处于同一个BFC中，此时它们的margin会重叠
  ```html
  <div class="top"></div>
  <div class="bottom"></div>
  ```
  ```css
  .top {
    width: 300px;
    height: 300px;
    background-color: red;
    margin: 100px;
  }
  .bottom {
    width: 300px;
    height: 300px;
    background-color: red;
    margin: 100px;
  }
  ```
  - 解决办法：将两个元素，分别放在不同的BFC中
  ```html
  <div class="container">
    <div class="top"></div>
  </div>
  <div class="container">
    <div class="bottom"></div>
  </div>
  ```
  ```css
  .container {
    overflow: hidden;
  }
  ```

### 