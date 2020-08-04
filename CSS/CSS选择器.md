# CSS选择器

### CSS有哪些选择器
 - 标签选择器
 - 属性选择器
 - id选择器
 - class选择器
 - 后代选择器 （div a）
 - 子代选择器 （div > p）
 - 相邻选择器（div + p）
 - 通配符选择器 （*）
 - 否定选择器 :not(.link){}
 - 伪类选择器
 - 伪元素选择器 ::before{}

### CSS3属性选择器
- [attribute]	用于选取带有指定属性的元素
- [attribute=value]	用于选取带有指定属性和值的元素
- [attribute~=value]	用于选取属性值中包含指定词汇的元素
- [attribute\|=value]	用于选取带有以指定值开头的属性值的元素，该值必须是整个单词
- [attribute^=value]	匹配属性值以指定值开头的每个元素
- [attribute$=value]	匹配属性值以指定值结尾的每个元素
- [attribute*=value]	匹配属性值中包含指定值的每个元素

### CSS3伪类选择器
[伪类 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-classes#%E6%A0%87%E5%87%86%E4%BC%AA%E7%B1%BB%E7%B4%A2%E5%BC%95)
1.  child伪类选择器
 - :first-child
 - :last-child
 - :nth-child(n)
 - :nth-child(n+2)
 - :nth-child(3n)
 - :nth-child(even)
 - :nth-last-child(n)
 - p:only-child 
2.  of-type伪类选择器: 与child基本相同
 - p:first-of-type 
 - p:last-of-type 
 - p:only-of-type 
 - p:nth-of-type(n)
 - p:nth-last-of-type(n)
3.  两种选择器的不同
    child选择器``先找孩子,再匹配前面的元素``
    of-type选择器``先匹配前面的元素,再找孩子``
    ```html
    <section>
        <p></p>
        <div></div>
        <div></div>
    </section>
    ```
    ```css
    section div:first-child { // 先找第一个子元素，找到p元素，因为不是div元素，所以无法匹配
        color: pink; 
    }
    section div:first-of-type { // 先找div子元素，再找第一个div元素，所以可以匹配
        color: red;
    }
    ```
4.  其它伪类选择器
 - :hover   定义元素在鼠标悬停(划过)时的样式
 - :link    定义元素在超链接状态下的样式
 - :focus   定义元素在获取焦点时的样式
 - :visited 定义元素被访问过后的样式
 - :active  定义元素在选定时的样式
 - :enabled 匹配每个已启用的元素（大多用在表单元素上）
 - :disabled    匹配每个已禁用的元素（大多用在表单元素上）
 - :checked 单选框或复选框被选中
 - :empty   一般用来隐藏内部什么都没有的元素
 - :not(selecter)

### CSS3伪元素选择器
1.  伪元素选择器用于创建一个元素,但实际上是不存在的
2.  伪元素选择器的权重和元素选择器一样
 - ::after 创建在父元素的内容的最后面
 - ::before 在元素之前添加内容
 - ::enabled 选择器匹配每个已启用的元素（大多用在表单元素上）。
 - ::disabled 控制表单控件的禁用状态。
 - ::checked 单选框或复选框被选中
 - ::selection  用户选中的区域
 - ::empty   一般用来隐藏内部什么都没有的元素
 - ::not(selecter)

### 选择器的权重
- !important > 内联样式表 > ID选择器 > (类选择器 | 属性选择器 | 伪类选择器 ) > (伪)元素选择器 > *
1.  !important 优先级最高，但也会被权重高的important所覆盖
2.  内联样式总会覆盖内部或外部样式表的任何样式(除了!important)
3.  单独使用一个选择器的时候，不能跨等级使css规则生效
4.  如果两个权重不同的选择器作用在同一元素上，权重值高的css规则生效
5.  如果两个相同权重的选择器作用在同一元素上,以后面出现的选择器为最后规则
6.  权重相同时，与元素距离近的选择器生效

### 浏览器解析CSS选择器的规则
- 浏览器解析CSS选择器时,根据选择器从右往左解析,比如:
    ```css
        div p.p1 span.red{
            color:red
        }
    ```
    首先匹配class为red的`span`,再匹配class为p1的`p`,最后匹配`div`
- 更详细的解释: https://www.cnblogs.com/aaronjs/p/3300797.html

### 