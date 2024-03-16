# 标签模板

## UI模板

> 标签

```C# 
using System;
using System.Runtime.CompilerServices;

//作用域
[AttributeUsage(AttributeTargets.Field)]
public class E_Label : EBase
{
    //[CallerLineNumber] int lineNumber = 0 必写参数，用来判断对象声明顺序
    public E_Label([CallerLineNumber] int lineNumber = 0) {
        _lineNum = lineNumber;
    }
}
```

> UI生成器 => UIGenerator中新增

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

> UI匹配逻辑 => BaseEditor.SetUI中更新

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

> UI匹配逻辑 => BaseEditor.SetStyle和BaseEditor.SetOption中更新

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

## 布局模板

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

> 布局生成器 => LayoutGenerator中新增

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

> UI匹配逻辑 => BaseEditor.SetStyle和BaseEditor.SetOption中更新

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