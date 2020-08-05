# CSS 实现三角形

### 使用 CSS 实现一个四等分的等腰三角形
  ```css
  span {
    /* 三角形的底边和高度由边框决定，因此不需要设置宽高 */
    width: 0;
    height: 0;
    /* 兼容浏览器 */
    line-height: 0;
    font-style: 0;
    /* 设置三个边框为透明 */
    border: 5px solid transparent;
    /* 设置下边框为三角形的底边 */
    border-bottom-color: red;
  }
  ```

### 使用 CSS 实现一个直角三角形
  ```css
  div {
    width: 0;
    height: 0;
    border-color: transparent red transparent transparent;
    border-style: solid;
    border-width: 100px 50px 0 0;
  }
  ```

### 使用 CSS 实现一个梯形
  ```html
  <div class="box">
    <span class="c1">
      <!-- 通常用 i 标签来放置三角形 -->
      <i></i>
    </span>
    <span class="c2"></span>
  </div>
  ```
  ```css
  .box {
    width: 150px;
    height: 24px;
    border: 1px solid red;
  }
  .c1 {
    position: relative;
    float: left;
    width: 90px;
    height: 100%;
    background-color: pink;
  }
  .c1 i {
    position: absolute;
    right: 0;
    top: 0;
    width: 0;
    height: 0;
    border-color: transparent white transparent transparent;
    border-style: solid;
    border-width: 24px 10px 0 0;
  }
  ```

### 