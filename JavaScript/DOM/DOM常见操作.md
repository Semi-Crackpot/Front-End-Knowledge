# DOM常见操作

### 查找节点
1.  document.getElementById
2.  document.getElementsByClassName
3.  document.getElementsByTagName
4.  document.getElementsByName
5.  document.querySelector：返回匹配成功的第一个元素，返回的是元素
6.  document.querySelectorAll：返回匹配成功的所有元素，返回的是一个NodeList对象

### NodeList对象
1.  NodeList对象是一个从文档中获取的节点列表
2.  NodeList中的元素可以通过索引来访问
3.  length属性定义了节点列表中元素的数量

### 创建节点
1.  创建元素节点：``document.createElement``
2.  创建文本节点：``document.createTextNode``
3.  克隆节点：``node.cloneNode(true/false)``，boolean参数决定是否复制子元素
4.  创建文档碎片节点：``document.createDocumentFragment``

### createDocumentFragment详解
1.  createDocumentFragment()方法，是用来创建一个文档碎片节点，它可以包含各种类型的节点，在创建之初是空的
2.  DocumentFragment节点不属于文档树，当请求把一个DocumentFragment节点插入文档树时，插入的不是DocumentFragment自身，而是它的所有子孙节点
3.  需要一次性添加很多DOM节点时，先将这些元素添加到DocumentFragment中，再统一将DocumentFragment添加到页面
    ```js
    var ul = document.getElementById("ul");
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 20; i++) {
        var li = document.createElement("li");
        li.innerHTML = "index: " + i;
        fragment.appendChild(li);
    }
    ul.appendChild(fragment);
    ```

### 修改节点
1.  在父节点的末尾插入子节点：``parent.appendChild(child)``
2.  在指定的子节点之前插入新节点：``parentNode.insertBefore(newNode, refNode)``
3.  删除指定的子节点并返回被删除的子节点：``var deletedChild = parent.removeChild(node)``
4.  将一个子节点替换另一个子节点：``parent.replaceChild(newChild, oldChild)``

### 节点关系
1.  父关系
  - parentNode：元素的父节点，该父节点可以是Element，Document或DocumentFragment
  - parentElement：元素的父节点，该节点必须是一个Element
2.  子关系
  - children：返回一个HTMLCollection对象，包含元素的子元素的集合，子节点都是元素节点
  - childNodes：返回一个NodeList对象，包含元素的子节点列表，子节点可以包含文本节点、注释节点等等
  - firstChild：返回第一个子节点
  - lastChild：返回最后一个子节点
3.  兄弟关系
  - previousSibling：节点的前一个节点，可能是元素节点、文本节点或注释节点
  - nextSibling：节点的后一个节点，可能是元素节点、文本节点或注释节点
  - previousElementSibling：节点的前一个节点，必须是元素节点
  - nextElementSibling：节点的后一个节点，必须是元素节点

### 元素属性
1.  设置属性：``element.setAttribute(name, value);``
2.  获取属性值：``var value = element.getAttribute("id");``
3.  查看是否拥有属性：``var result = element.hasAttribute(name);``

### 样式
1.  修改元素样式：``elem.style.color = 'red';``
2.  添加样式规则
  ```js
  var style = document.createElement('style');  
  style.innerHTML = 'body{color:red} #top:hover{background-color: red;color: white;}';  
  document.head.appendChild(style);  
  ```

### 