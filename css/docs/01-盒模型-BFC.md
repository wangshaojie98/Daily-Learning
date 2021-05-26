### javascript如何设置获取盒模型对应的宽和高
1. dom.style.width/heigth只能拿到行内样式的宽和高，style标签中和link外链的样式取不到。
2. dom.currentStyle.width/height 取到的是最终渲染后的宽和高，只有IE支持此属性。
3. window.getComputedStyle(dom).width/heigth同（2）但是多浏览器支持，IE9以上支持。
4. dom.getBoundingClientRect().width/height也是得到渲染后的宽和高，大多浏览器支持。IE9以上支持，除此外还可以取到相对于视窗的上下左右的距离

### 外边距重叠
垂直方向外边距取决于最大值。（只有普通文档流才会发生外边距重叠，行内框、浮动框、绝对定位之间的外边距不会合并）。
这与下文的BFC有关联。

### BFC
BFC(Block Formatting Context)：块级格式化上下文。
BFC决定了元素如何对其内容进行定位，以及与其他元素的关系和相互作用。当设计到可视化布局的时候，BFC提供了一个环境，HTML元素在这个环境中按照一定的规则进行布局。一个环境中的元素不会影响到其他环境中的布局。

#### BFC的原理（渲染规则）
1. BFC内部元素垂直方向的边距会发生重叠。属于不同BFC外边距不会发生重叠
2. BFC的区域不会与浮动元素的布局重叠。
3. BFC元素是一个独立的容器，外面的元素不会影响里面的元素。里面的元素也不会影响外面的元素。
4. 计算BFC高度的时候，浮动元素也会参与计算(清除浮动)

#### 如何创建BFC
1. overflow为hidden|auto|scroll
2. float为 left|right
3. position为absolute 或 fixed
4. display为 table-cell|table-caption|inline-block|inline-flex|flex

