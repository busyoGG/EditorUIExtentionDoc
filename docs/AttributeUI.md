# UI 特性

## E_Editor

### 说明

E_Editor 特性只有一个参数 EType，用于区别想要创建的 UI 类型。

### 使用方法

```C#
[E_Editor(EType. Label)]
private string _label = "测试 Label"; 
```

### 标签参数

> 所有类型（除了单选框）UI 都可以通过 `E_Name` 特性设置文本，如按钮上的文本或输入框之前的文本。
> 所有类型 UI 都支持样式特性。

|名称 | 枚举 | 类型 | 说明 | 配合特性 |例图 |
|:-:|:-:|:-:|:-:|:-:|:-:|
|按钮|Button|Method|在方法上打特性，自动生成能够执行改方法的按钮||![](https://img.busyo.buzz/imgUpload/20240528-032243-738.png)|
|输入框|Input|string|在字段上打特性，自动生成带描述标签的输入框 | `Wrap` ：该特性决定输入框是否在描述标签的下一行 |![](https://img.busyo.buzz/imgUpload/20240528-032302-536.png)|
|标签|Label|string|在字段上打特性，自动生成标签，标签内容为该字段的内容||![](https://img.busyo.buzz/imgUpload/20240528-032126-683.png)|
|对象|Object|Obejct 及其派生类 | 在字段上打特性，自动生成带描述标签的对象选择器，并且标签固定在上方 | `E_DataType` ：该特性决定对象选择器的类型限制 |![](https://img.busyo.buzz/imgUpload/20240528-032424-373.png)![](https://img.busyo.buzz/imgUpload/20240528-032521-180.png)<br>![](https://img.busyo.buzz/imgUpload/20240528-032323-530.png)![](https://img.busyo.buzz/imgUpload/20240528-032552-842.png)|
|枚举|Enum|Enum|在字段上打特性，自动生成带描述标签的枚举选择框，枚举的选项由定义字段的枚举类型决定|`E_Wrap`：该特性决定滑动条是否在描述标签的下一行 |![](https://img.busyo.buzz/imgUpload/20240528-032727-753.png)|
|滑动条|Slider|int/float|在字段上打特性，自动生成带描述标签的滑动条。该滑动条可以通过拖拽设置值，也可以通过直接输入来设置值|`E_Range`：该特性决定滑动条的范围<br>`E_Wrap`：该特性决定滑动条是否在描述标签的下一行 <br>`E_DataType` ：该特性决定滑动条的类型，传入 int 为整型滑动条，其他情况为浮点型 |![](https://img.busyo.buzz/imgUpload/20240528-032745-848.png)|
|选择框|Toggle|bool|在字段上打特性，自动生成选择框|`E_Name`：该特性决定选择框后面的描述文本 |![](https://img.busyo.buzz/imgUpload/20240528-032819-956.png)|
|单选框|Radio|int|在字段上打特性，自动生成单选框|`E_Options`：该特性决定单选框的选项|![](https://img.busyo.buzz/imgUpload/20240528-032806-19.png)|

### 列表

IMGUI 的列表由特殊的 [IMGUI 布局特性](/AttributeLayoutIMGUI) 组成，VisualElement 的列表不需要特殊处理。目前 VisualElement 的列表只有 Object 类型，用法和 Object 标签参数一样。

VisualElement 列表支持拖拽交换数据，效果如下：

<video src='https://video.spup.buzz/2024-05-28-17-20-50.mov'></video>

<video src='https://video.spup.buzz/2024-05-28-17-20-47.mov'></video>