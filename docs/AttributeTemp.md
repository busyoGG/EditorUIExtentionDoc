# 标签模板

## UI 模板

> 在 EENum 文件中增加类型枚举即可

```C#
public enum EType
{
    Button,
    Input,
    Label,
    Object,
    Enum,
    Slider,
    Toggle,
    Radio
}
```

<!-- tabs:start -->

### **VE**

> VisualElement UI 匹配逻辑 => BaseEditorVE.GenerateItem 中更新

```C#
/// <summary>
/// 生成元素
/// </summary>
/// <param name="parent"></param>
/// <param name="member"></param>
/// <param name="eType"></param>
/// <param name="data"></param>
/// <param name="setData"></param>
/// <param name="isList"></param>
private void GenerateItem(VisualElement parent, MemberInfo member, EType eType, object data,
    Action<object> setData, bool isList = false)
{
    //省略辅助数据
    switch (eType)
    {
        case EType.Label:
            Label label = new Label();
            label.style.fontSize = _fontSize;
            label.text = data.ToString();

            InitInnerStyle(member, label);

            parent.Add(label);
            break;
            //其他case
    }
}
```

### **IMGUI**

> IMGUI UI 生成器 => UIGenerator 中新增

```C#
/// <summary>
/// 生成Label
/// </summary>
/// <param name="labelName">标签名</param>
/// <returns></returns>
public static Action<GUIStyle, GUILayoutOption[]> GenerateLabel(Func<string> labelName)
{
    Action<GUIStyle, GUILayoutOption[]> label = (GUIStyle style, GUILayoutOption[] options) =>
    {
        //这里面是UI生成的逻辑
        GUILayout.Label(labelName(), style, options);
    };

    return label;
}
```

> IMGUI UI 匹配逻辑 => BaseEditorIMGUI.SetUI 中更新

```C#
/// <summary>
/// 设置UI
/// </summary>
/// <param name="member"></param>
/// <param name="ui"></param>
/// <param name="styles"></param>
/// <param name="name"></param>
/// <param name="getVal"></param>
/// <returns></returns>
private UIListData SetUI(MemberInfo member, object ui, List<object> styles, string name, Func<object> getVal)
{
    UIListData list = new UIListData();
    //创建ui
    if (member.MemberType == MemberTypes.Field)
    {
        //字段
        Action<GUIStyle, GUILayoutOption[]> action = null;

        object val = getVal();

        switch (ui)
        {
            //适配UI
            //例：
            case E_Label:
                Func<string> labelName = () =>
                {
                    return (string)getVal();
                };
                action = UIGenerator.GenerateLabel(labelName);
                break;
        }

        list.style = SetStyle(ui, styles);
        list.options = SetOption(ui, styles);
        list.action = action;
    }
    else if (member.MemberType == MemberTypes.Method)
    {
        //方法
        Action<GUIStyle, GUILayoutOption[]> action = null;
        switch (ui)
        {
            //适配UI
            //例：
            case E_Button:
                E_Button attr = (E_Button)ui;
                action = UIGenerator.GenerateButton(attr.GetName(), (MethodInfo)member, this);
                break;
        }

        list.style = SetStyle(ui, styles);
        list.options = SetOption(ui, styles);
        list.action = action;
    }

    return list;
}
```

<!-- tabs:end -->

## 样式模板

> 标签

```C#
using System;
using UnityEngine;

public class ES_Size : Attribute
{
    public ES_Size()
    {

    }
}
```

<!-- tabs:start -->

### **VE**

> UI 匹配逻辑 => BaseEditorVE.InitInnerStyle 和 BaseEditorVE.InitStyle

**注意：**

1. 样式匹配需要加入到 attrs 数组。
2. 内联样式涉及各种状态，因此需要监听不同状态的触发来设置不同状态下的样式。
3. 内联样式具有返回值，返回是否有设置样式，有些需要根据是否设置内联样式而进行的 UI 元素特殊处理可以通过 `if(InitInnerStyle())` 后执行。

```C#
/// <summary>
/// 设置内联样式
/// </summary>
/// <param name="member"></param>
/// <param name="style"></param>
private bool InitInnerStyle(MemberInfo member, VisualElement ele)
{
    bool isSet = true;

    int count = 0;

    VisualElement inputListener = null;

    bool isFocus = false;

    //匹配的样式列表
    List<object> attrs = new List<object>()
            {
                member.GetCustomAttribute<ES_BgColor>(),
                member.GetCustomAttribute<ES_FontColor>(),
                member.GetCustomAttribute<ES_Border>(),
                member.GetCustomAttribute<ES_BorderColor>(),
                member.GetCustomAttribute<ES_Radius>(),
                member.GetCustomAttribute<ES_Size>()
            };

    Action onMouseDown = null;
    Action onMouseUp = null;
    Action onMouseHover = null;
    Action onMouseOut = null;
    Action onFocus = null;
    Action onNotFocus = null;

    foreach (var attr in attrs)
    {
        if (attr == null)
        {
            count++;
            continue;
        }

        switch (attr)
        {
            case ES_BgColor bgColor:
                ele.style.backgroundColor = bgColor.GetColor();
                onMouseDown += () =>
                {
                    Color buttonColor = bgColor.GetColor() * 0.8f;
                    buttonColor.a = 1;
                    ele.style.backgroundColor = buttonColor;
                };

                onMouseUp += () => { ele.style.backgroundColor = bgColor.GetColor(); };

                onMouseHover += () =>
                {
                    if (_isLeftMouseDown)
                    {
                        Color buttonColor = bgColor.GetColor() * 0.8f;
                        buttonColor.a = 1;
                        ele.style.backgroundColor = buttonColor;
                    }
                    else
                    {
                        Color buttonColor = bgColor.GetColor() + new Color(0.5f, 0.5f, 0.5f);
                        ele.style.backgroundColor = buttonColor;
                    }
                };

                onMouseOut += () => { ele.style.backgroundColor = bgColor.GetColor(); };

                break;
            //其他case
        }
    }

    if (count == attrs.Count)
    {
        isSet = false;
    }

    if (isSet)
    {
        ele.RegisterCallback<MouseDownEvent>(evt => { onMouseDown?.Invoke(); });

        ele.RegisterCallback<MouseUpEvent>(evt => { onMouseUp?.Invoke(); });

        ele.RegisterCallback<MouseOverEvent>(evt => { onMouseHover?.Invoke(); });

        ele.RegisterCallback<MouseOutEvent>(evt => { onMouseOut?.Invoke(); });

        if (inputListener != null)
        {
            inputListener.RegisterCallback<FocusInEvent>(evt => { onFocus?.Invoke(); });

            inputListener.RegisterCallback<FocusOutEvent>(evt => { onNotFocus?.Invoke(); });
        }
        else
        {
            ele.RegisterCallback<FocusInEvent>(evt => { onFocus?.Invoke(); });

            ele.RegisterCallback<FocusOutEvent>(evt => { onNotFocus?.Invoke(); });
        }
    }

    return isSet;
}
```

**该样式初始化目前只有创建 Box 使用，没有任何监听项目。**

```C#
/// <summary>
/// 初始化样式
/// </summary>
/// <param name="ele"></param>
/// <param name="attrs"></param>
private void InitStyle(VisualElement ele, dynamic attrs)
{
    //遍历 Attribute 设置容器样式
    foreach (var attr in attrs)
    {
        switch (attr)
        {
            case ES_Size size:
                switch (size.GetSizeType())
                {
                    case ESPercent.All:
                        ele.style.width = Length.Percent(size.GetWidth());
                        ele.style.height = Length.Percent(size.GetHeight());
                        break;
                    case ESPercent.Height:
                        ele.style.width = size.GetWidth();
                        ele.style.height = Length.Percent(size.GetHeight());
                        break;
                    case ESPercent.Width:
                        ele.style.width = Length.Percent(size.GetWidth());
                        ele.style.height = size.GetHeight();
                        break;
                    default:
                        ele.style.width = size.GetWidth();
                        ele.style.height = size.GetHeight();
                        break;
                }

                break;
            //其他case
        }
    }
}
```

### **IMGUI**

> UI 匹配逻辑 => BaseEditorIMGUI.SetStyle 和 BaseEditorIMGUI.SetOption 中更新

```C#
/// <summary>
/// 设置样式绘制函数
/// </summary>
/// <param name="ui"></param>
/// <param name="styles"></param>
/// <returns></returns>
private Func<GUIStyle> SetStyle(object ui, List<object> styles = null)
{
    if (ui == null) return null;

    GUIStyle guiStyle = null;

    Func<GUIStyle> setStyle = () =>
    {
        guiStyle = GenerateStyle(ui);
        //guiStyle.normal.textColor = Color.black;
        //guiStyle.margin = new RectOffset(0,0,0,0);

        if (styles != null)
        {
            //创建GUIStyle
            foreach (var style in styles)
            {
                switch (style)
                {
                    //例：（暂时没有）
                }
            }
        }

        return guiStyle;
    };

    return setStyle;
}

/// <summary>
/// 设置GUILayout
/// </summary>
/// <param name="ui"></param>
/// <param name="styles"></param>
/// <returns></returns>
private Func<GUILayoutOption[]> SetOption(object ui, List<object> styles = null)
{
    if (ui == null) return null;
    Func<GUILayoutOption[]> action = () =>
    {
        List<GUILayoutOption> options = new List<GUILayoutOption>();
        if (styles != null)
        {
            //创建GUILayoutOption
            foreach (var style in styles)
            {
                switch (style)
                {
                    //例：
                    case ES_Size:
                        ES_Size size = (ES_Size)style;
                        ESPercent percent = size.GetSizeType();
                        Vector2 vec2Size = size.GetSize();

                        vec2Size = LayoutGenerator.CalSize(percent, vec2Size, this);

                        options.Add(GUILayout.Width(vec2Size.x));
                        options.Add(GUILayout.Height(vec2Size.y));

                        break;
                }
            }
        }
        return options.ToArray();
    };

    return action;
}
```

<!-- tabs:end -->

## 布局模板

<!-- tabs:start -->

### **VE**

> 标签

```C#
using System;

public class VE_Box : Attribute
{

}
```

> 布局逻辑 ==> BaseEditorVE.Init 中自行修改，目前只有创建 Box 和创建 Editor UI 两种情况

### **IMGUI**

> 标签

```C#
using System;

public class EL_Horizontal : Attribute
{
    //必写，用于判断布局开头结尾
    private bool _isStart;

    public EL_Horizontal(bool isStart)
    {
        _isStart = isStart;
    }

    //必写，用于判断布局开头结尾
    public bool IsStart()
    {
        return _isStart;
    }
}
```

> 布局生成器 => LayoutGenerator 中新增

```C#
/// <summary>
/// 生成水平布局
/// </summary>
/// <param name="isStart"></param>
/// <returns></returns>
public static Action<GUIStyle, GUILayoutOption[]> GenerateHorizontal(Action renderAction)
{
    Action<GUIStyle, GUILayoutOption[]> action = (GUIStyle style, GUILayoutOption[] options) =>
    {
        //这里面是布局生成的具体逻辑
        EditorGUILayout.BeginHorizontal(style, options);
        renderAction();
        GUILayout.EndHorizontal();
    };
    return action;
}
```

> UI 匹配逻辑 => BaseEditorIMGUI.SetStyle 和 BaseEditorIMGUI.SetOption 中更新

```C#
/// <summary>
/// 设置布局
/// </summary>
/// <param name="layout"></param>
/// <param name="node"></param>
/// <param name="member"></param>
/// <returns></returns>
private Action<GUIStyle, GUILayoutOption[]> SetLayout(object layout, LayoutNode node, MemberInfo member)
{
    if (layout == null) return null;
    switch (layout)
    {
        //例：
        case EL_List:
            EL_List elList = (EL_List)layout;
            //NormalRender为普通渲染，不涉及UI渲染过程中植入其他逻辑
            //FlexRender为流式渲染，在UI渲染的过程中植入了额外的逻辑
            //具体内容见源码
            Action render = elList.ListType() == EL_ListType.Flex ? FlexRender(node, member) : NormalRender(node);
            return LayoutGenerator.GenerateList(render, (EL_List)layout, this);
    }
    return null;
}
```

<!-- tabs:end -->
