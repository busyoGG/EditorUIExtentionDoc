# 样式特性

## 使用方法

样式特性可以随意添加，为了区分可以单独起一行，`...`代表其他特性，特性之间用逗号隔开。

```C# 
[E_Texture]
[ES_Size(70, 70),...]
public Texture size1; 
```

## ES_Size

UI 尺寸。

|参数 1 |参数 2|参数 3|
|:-:|:-:|:-:|
|float：宽度|float：高度|ESPercent：百分比类型|

> ESPercent 枚举

|ESPercent|说明 | 调用 | 例图 |
|:-:|:-:|:-:|:-:|
|ESPercent.None|按像素|`ES_Size(70, 70)`|![](https://img.busyo.buzz/imgUpload/20240528-152945-323.png)|
|ESPercent.Width|宽度百分比，高度按像素|`ES_Size(70,100,ESPercent.Width)`|![](https://img.busyo.buzz/imgUpload/20240528-153319-434.png)|
|ESPercent.Height|高度百分比，宽度按像素，由于 VisualElement 高度自动布局问题，不建议使用|`ES_Size(100,50,ESPercent.Height)`|![](https://img.busyo.buzz/imgUpload/20240528-154531-540.png)|
|ESPercent.All|按百分比|`ES_Size(50,50,ESPercent.All)`|![](https://img.busyo.buzz/imgUpload/20240528-154623-988.png)|

## ES_Color 系列

UI 颜色。VisualElement 专用。

|系列名称 | 说明 |例图 |
|:-:|:-:|:-:|
|ES_BgColor|背景颜色 |![](https://img.busyo.buzz/imgUpload/20240528-155201-260.png)|
|ES_BorderColor|描边颜色 |![](https://img.busyo.buzz/imgUpload/20240528-155231-531.png)|
|ES_FontColor|字体颜色|![](https://img.busyo.buzz/imgUpload/20240528-155316-29.png)|

|参数 1 |参数 2|参数 3|参数 4|
|:-:|:-:|:-:|:-:|
|r：红色分量|g：绿色分量|b：蓝色分量|a：透明度分量|

**混搭效果**

![](https://img.busyo.buzz/imgUpload/20240528-155411-685.png)

## ES_Border

UI 描边。VisualElement 专用。

该特性分为两种初始化形式。

> 设置一个数为所有方向描边的粗细

|参数 1|
|:-:|
|width：四周描边粗细|

**效果**

`ES_Border(3)`

![](https://img.busyo.buzz/imgUpload/20240528-155231-531.png)

> 设置四个数为四个方向描边的粗细

|参数 1 |参数 2|参数 3|参数 4|
|:-:|:-:|:-:|:-:|
|t：上描边粗细|r：右描边粗细|b：下描边粗细|l：左描边粗细|

**效果**

`ES_Border(10,5,2,0)`

![](https://img.busyo.buzz/imgUpload/20240528-160316-163.png)

## ES_Radius

UI 圆角。VisualElement 专用。

该特性分为两种初始化形式。

> 设置一个数为所有角的圆角

|参数 1|
|:-:|
|radius：四个角的圆角|

**效果**

`ES_Radius(10)`

![](https://img.busyo.buzz/imgUpload/20240528-161217-420.png)

> 设置四个数为四个角的圆角

|参数 1 |参数 2|参数 3|参数 4|
|:-:|:-:|:-:|:-:|
|tr：右上|br：右下|bl：坐下|tl：左上|

**效果**

`ES_Radius(0,5,10,15)`

![](https://img.busyo.buzz/imgUpload/20240528-161349-149.png)