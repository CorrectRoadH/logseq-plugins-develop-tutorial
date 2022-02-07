# 为logseq添加可视组件

## 起步

在`logseq`中有一种特殊的语法`{{renderer }}`，我们可以通过插件实现把`{{renderer }}`渲染为特定的内容。

比如在` logseq-plugin-link-preview`插件中`{{renderer :linkpreview,https://google.com}}`将会被显示为：

7.gif



## 注册渲染函数

我们可以用上一章的项目为基础，改一下`packget.json`中的项目内容。

我们使用`onMacroRendererSlotted`去实现该功能

```javascript
  logseq.App.onMacroRendererSlotted(({ slot, payload} ) => {
    const [type,name] = payload.arguments
    if (type !== ':hello') return
    logseq.provideUI({
      key: 'h1-playground',
      slot, template: `
      <div class="hello">
        hello! ${name}
      </div>  
     `,
    })
  })
```

我们在`{{renderer :hello,Logseq}}`中`renderer`后面的内容就会存在`payload`的`arguments`中。我们可以通过解构的方式去得到里面的值。

修改`main.tsx`

```javascript
import '@logseq/libs'

async function main () {

  logseq.App.onMacroRendererSlotted(({ slot, payload} ) => {
    const [type,name] = payload.arguments
    if (type !== ':hello') return
    logseq.provideUI({
      key: 'hello',
      slot, template: `
      <div class="hello" >
        hello! ${name}
      </div>  
     `,
    })
  })

}

logseq.ready(main).catch(console.error)
```

`npm build`并载入`logseq`。

8.gif



## 添加样式

光有`html`实现好看的内容，我们还需要为其提供`css`样式。

在`logseq`中，`  logseq.provideStyle`提供了这个功能。

```
  logseq.provideStyle(`
    .hello {
       background-color: red;
       border: 1px solid var(--ls-border-color); 
       white-space: initial; 
       padding: 2px 4px; 
       border-radius: 4px; 
       user-select: none;
       cursor: default;
       display: flex;
       align-content: center;
    }`)
```

ps：该css出自`logseq-plugin-samples`

现在我们的`main.tsx`是这样的

```javascript
import '@logseq/libs'

async function main () {
  logseq.provideStyle(`
    .hello {
       background-color: red;
       border: 1px solid var(--ls-border-color); 
       white-space: initial; 
       padding: 2px 4px; 
       border-radius: 4px; 
       user-select: none;
       cursor: default;
       display: flex;
       align-content: center;
    }`)

  logseq.App.onMacroRendererSlotted(({ slot, payload} ) => {
    const [type,name] = payload.arguments
    if (type !== ':hello') return
    logseq.provideUI({
      key: 'hello',
      slot, template: `
      <div class="hello">
        hello! ${name}
      </div>  
     `,
    })
  })
}

logseq.ready(main).catch(console.error)

```

 来看看效果：

9.png



## 事件

还有内容还不够，我们还可以为该`html`添加上事件

