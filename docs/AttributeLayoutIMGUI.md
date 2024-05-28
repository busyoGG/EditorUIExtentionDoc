# IMGUI 布局特性

> 注：布局标签严格按照布局顺序添加。
> 例如：
> ```C# 
> //参数 1 代表是否开始布局，参数 2 代表折叠标题
> [E_Editor(EType.Object),E_DataType(DataType.Texture), ES_Size(70, 70), EL_Foldout(true, "折叠"),EL_Horizontal(true)]
> public Texture foldout1;
> //折叠布局标签需要成对使用
> [E_Editor(EType.Object),E_DataType(DataType.Texture), ES_Size(70, 70), EL_Horizontal(false),EL_Foldout(false)]
> public Texture foldout2;
> ```
> 顺序为 EL_Foldout(true) > EL_Horizontal(true) > EL_Horizontal(false) > EL_Foldout(false) 

## EL_Horizontal

### 效果

![](https://img.busyo.buzz/imgUpload/20240316-210424-417.png)

### 使用方法

```C# 
//传入一个参数，true代表开始布局，false代表结束布局
[E_Editor(EType.Object),E_DataType(DataType.Texture), ES_Size(70, 70), EL_Horizontal(true)]
public Texture horizontal1;
[E_Editor(EType.Object),E_DataType(DataType.Texture), ES_Size(70, 70)]
public Texture horizontal2;
//水平布局标签需要成对使用
[E_Editor(EType.Object),E_DataType(DataType.Texture), ES_Size(70, 70), EL_Horizontal(false)]
public Texture horizontal3;
```

## EL_Vertical

### 效果

![](https://img.busyo.buzz/imgUpload/20240316-210747-495.png)

### 使用方法

```C# 
//传入一个参数，true代表开始布局，false代表结束布局
[E_Editor(EType.Object),E_DataType(DataType.Texture), ES_Size(70, 70), EL_Vertical(true)]
public Texture vertical1;
[E_Editor(EType.Object),E_DataType(DataType.Texture), ES_Size(70, 70)]
public Texture vertical2;
//竖直布局标签需要成对使用
[E_Editor(EType.Object),E_DataType(DataType.Texture), ES_Size(70, 70), EL_Vertical(false)]
public Texture vertical3;
```

## EL_Foldout

### 效果

![](https://img.busyo.buzz/imgUpload/20240316-211614-460.png)

![](https://img.busyo.buzz/imgUpload/20240316-211620-92.png)

### 使用方法

```C# 
//参数1代表是否开始布局，参数2代表折叠标题
[E_Editor(EType.Object),E_DataType(DataType.Texture), ES_Size(70, 70), EL_Foldout(true, "折叠")]
public Texture foldout1;
//折叠布局标签需要成对使用
[E_Editor(EType.Object),E_DataType(DataType.Texture), ES_Size(70, 70), EL_Foldout(false)]
public Texture foldout2;
```

## EL_List

### 效果

* 竖直布局

![](https://img.busyo.buzz/imgUpload/20240316-212011-332.png)

* 水平布局

![](https://img.busyo.buzz/imgUpload/20240316-212155-58.png)

* 流式布局

![](https://img.busyo.buzz/imgUpload/20240316-212446-488.png)
![](https://img.busyo.buzz/imgUpload/20240316-212501-666.png)

* 滚动面板

![](https://img.busyo.buzz/imgUpload/20240316-212835-105.png)

* 单对象列表

![](https://img.busyo.buzz/imgUpload/20240316-213029-733.png)

### 使用方法

> 注：列表一定要传入 ES_Size 配合使用，ES_Size 表示当前子对象的大小

```C# 
//竖式布局
//参数1代表是否开始布局，参数2代表列表类型，参数3代表是否单参数列表
[E_Editor(EType.Object),E_DataType(DataType.Texture), ES_Size(70, 70), EL_List(true, EL_ListType.Verticle, false)]
public Texture listV1;
[E_Editor(EType.Object),E_DataType(DataType.Texture), ES_Size(70, 70)]
public Texture listV2;
//不是单参数列表的情况下需要成对使用列表标签
[E_Editor(EType.Object),E_DataType(DataType.Texture), ES_Size(70, 70), EL_List(false)]
public Texture listV3;

//水平布局
[E_Editor(EType.Object),E_DataType(DataType.Texture), ES_Size(70, 70), EL_List(true, EL_ListType.Horizontal, false)]
public Texture listH1;
[E_Editor(EType.Object),E_DataType(DataType.Texture), ES_Size(70, 70)]
public Texture listH2;
[E_Editor(EType.Object),E_DataType(DataType.Texture), ES_Size(70, 70), EL_List(false)]
public Texture listH3;

//流式布局
[E_Editor(EType.Object),E_DataType(DataType.Texture), ES_Size(70, 70), EL_List(true, EL_ListType.Flex, false)]
public Texture listF1;
[E_Editor(EType.Object),E_DataType(DataType.Texture), ES_Size(70, 70)]
public Texture listF2;
[E_Editor(EType.Object),E_DataType(DataType.Texture), ES_Size(70, 70), EL_List(false)]
public Texture listF3;

//滚动面板-竖式布局
//参数4代表列表是否滚动，参数5代表宽度，参数6代表高度，参数7代表宽高类型
[E_Editor(EType.Object),E_DataType(DataType.Texture), ES_Size(70, 70), EL_List(true, EL_ListType.Verticle, false, true, 100, 100, ESPercent.Width)]
public Texture listS1;
[E_Editor(EType.Object),E_DataType(DataType.Texture), ES_Size(70, 70)]
public Texture listS2;
[E_Editor(EType.Object),E_DataType(DataType.Texture), ES_Size(70, 70), EL_List(false)]
public Texture listS3;

//单参数-竖式布局
//单参数列表需要设置参数3为true，列表标签只需要一个即可
[E_Editor(EType.Object),E_DataType(DataType.Texture), ES_Size(70, 70), EL_List(true, EL_ListType.Verticle, true, true, 100, 100, ESPercent.Width)]
public List<Texture> singleList = new List<Texture>() { null, null, null };
```