# CSS3动画

### 如何定义 CSS3 动画
1.  首先通过 @keyframes 创建动画
  ```css
  @keyframes move {
      from {
          top: 0px;
      }
      to {
          top: 200px;
      }
  }
  ```
2.  再把动画绑定到元素上
  ```css
  div {
      width: 100px;
      height: 100px;
      background-color: blue;
      // 动画名和动画持续时间
      animation: move 3s;
      // 必须设置相对定位
      position: relative;
  }
  ```

### CSS3 动画变化的时间
1.  使用关键词 from 和 to，此时动画只有2个状态
2.  使用百分比：0% 25% 50% 75% 100%

### CSS3 动画属性
- animation 是所有动画属性的简写
  ```css
  div {
    animation: 动画名称 持续时间 速度曲线 动画延迟（何时开始） 播放次数 是否在下一周期逆向地播放 是否正在运行或暂停 
  }
  ```

### 