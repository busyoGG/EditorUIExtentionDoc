# 样式标签

## ES_SIZE

### 效果

![](https://img.busyo.buzz/imgUpload/20240316-204558-586.png)

### 使用方法

```C# 
//第一个参数为宽度，第二个参数为高度
[E_Texture, ES_Size(70, 70)]
public Texture size1;
//第三个参数是百分比类型，高度百分比模式为UI高度设为EditorWindow一定百分比，宽度为固定像素
[E_Texture, ES_Size(70, 10, ESPercent.Height)]
public Texture size2;
//宽度百分比模式为UI宽度设为EditorWindow一定百分比，高度为固定像素
[E_Texture, ES_Size(50, 70, ESPercent.Width)]
public Texture size3;
//全百分比模式为UI宽高设为EditorWindow一定百分比
[E_Texture, ES_Size(50, 10, ESPercent.All)]
public Texture size4;
```