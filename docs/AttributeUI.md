# UI标签

## E_Label

### 效果

![](https://img.busyo.buzz/imgUpload/20240316-183031-524.png)

### 使用方法

```C# 
[E_Label]
public string label = "Label样式";
```

## E_Input

### 效果

![](https://img.busyo.buzz/imgUpload/20240316-201935-179.png)

### 使用方法

```C# 
//默认input控件标签宽度为30%
[E_Input]
public string defInput;

//参数1代表input控件标签的宽度，参数2代表标签宽度是否百分比
//如果是百分比，50代表的就是百分之五十
[E_Input(50, false)]
public string strInput;
```

## E_Texture

### 效果

![](https://img.busyo.buzz/imgUpload/20240316-202533-869.png)

### 使用方法

```C# 
[E_Texture]
public Texture texture;
```

## E_Button

### 效果

![](https://img.busyo.buzz/imgUpload/20240316-202902-620.png)

### 使用方法

```C# 
//button标签用于标记函数，标签传入的参数是按钮的名字
[E_Button("按钮")]
public void Button()
{

}
```