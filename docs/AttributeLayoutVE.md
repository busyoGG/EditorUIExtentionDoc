# VisualElement 布局特性

## VE_Box

UI 组的包围盒。可以搭配 `E_Name` 使用，在组头增加一个组名的标签。

### 使用方法

```C# 
//创建组
//group1为组名
//E_Name为显示在组头的标签
[VE_Box(false,true),E_Name("自定义组1")]
private string _group = "group1";

//加入组
[VE_Box("group1")]
[E_Editor(EType.Label)]
private string _label = "测试Label";
```

### 参数说明

该特性分为两种初始化形式。

> 创建组

|参数 1|参数 2|
|:-:|:-:|
|isHorizontal：是否横向布局|isFold：是否可折叠|

> 加入组

|参数 1|
|:-:|
|name：组名|

### 例图

> 是否横向布局

|布局 | 例图 |
|:-:|:-:|
|纵向|![](https://img.busyo.buzz/imgUpload/20240528-165853-636.png)|
|横向|![](https://img.busyo.buzz/imgUpload/20240528-165924-60.png)|

> 是否折叠

|折叠 | 例图 |
|:-:|:-:|
|不折叠|![](https://img.busyo.buzz/imgUpload/20240528-165853-636.png)|
|折叠|![](https://img.busyo.buzz/imgUpload/20240528-170026-703.png)<br>![](https://img.busyo.buzz/imgUpload/20240528-170045-317.png)|
