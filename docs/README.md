# EditorUIExtention 文档

各部分功能说明及使用方式文档

## 文档说明

- 本文档使用 [docsify](https://docsify.js.org/#/zh-cn/) 构建。
- 项目工程见 [EditorUIExtention](https://github.com/busyoGG/EditorUIExtention)。
- 编辑器脚本需要继承 `BaseEditorIMGUI` 或者 `BaseEditorVE`。这是两种不同的实现方式，前者是 IMGUI 实现，后者是 VisualElement 实现，此处主推 VE 版本，可以实现更多的样式。
- 项目原理说明见 [Unity-编辑器 UI 开发优化框架 EditorUIExtension](https://busyo.buzz/article/497b56da32cd/)。

<!-- * `_sidebar.md` 文件为侧边栏导航配置文件。 -->

<!-- * 如果需要增加侧边栏项目，请在 docs 文件夹下新建 md 文档，并且配置到侧边栏导航文件中。 -->

<!-- * `AfterProgress.js` 为页面处理代码，一些页面的布局处理效果在这里实现。 -->

- `index.html` 中的 `plugins` 的 `function(hook)` 提供自定义插件的修改能力，详情见[开发插件](https://docsify.js.org/#/zh-cn/write-a-plugin)

## 特殊插件使用说明

### tab

<!-- tabs:start -->

#### **English**

Hello!

#### **French**

Bonjour!

#### **Italian**

Ciao!

<!-- tabs:end -->

按照如下格式书写

```markdown
<!-- tabs:start -->

#### **English**

Hello!

#### **French**

Bonjour!

#### **Italian**

Ciao!

<!-- tabs:end -->
```
