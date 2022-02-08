# 通过命令显示窗口

这次我们来创建一个快捷创建`markdown`的表格。当我们输入`/create table`时，显示出一个`create table`窗口，填入我们想要的`row`和`col`就往`logseq`插入我们想要的`markdown`表格。

这次项目同样基于`logseq-plugin-template-react`

## 搭建

参考上一章

## 注册命令

在`main.tsx`

```typescript
 logseq.Editor.registerSlashCommand(
      'create table', async () => {
        logseq.showMainUI()
      },
  )
```

## 写窗口

新建`table.tsx`和`table.css`

```typescript
import React, {useEffect} from "react";
import "./table.css"

const createTable = (row:number, col:number)=>{
    let content = "|"
    let rowContent = "|"

    for(let i = 0; i < col; i++){
        content += ` Col ${i} |`
    }
    content += "\n"
    content += "|"

    for(let i = 0; i < col; i++){
        content += " --- |"
    }
    content += "\n"

    for(let j = 0; j < col; j++){
        rowContent += "   |"
    }
    rowContent += "\n"

    for(let i = 0; i < row; i++){
        content +=
            rowContent
    }
    return content
}

const insertContent = async (content:string) =>{
    window.logseq.hideMainUI({ restoreEditingCursor: true });
    await window.logseq.Editor.insertAtEditingCursor(content);
}

// eslint-disable-next-line react/display-name,no-empty-pattern
export const Table = React.forwardRef<HTMLDivElement>(({}, ref) => {
    const [row, setRow] = React.useState("3");
    const [col, setCol] = React.useState("4");

    return(
        <div
            ref={ref}
            className="table-root"
            >
            <div className="center">
                <div>
                    Rows: <input value={row} onChange={(e)=>setRow(e.target.value)}/>
                </div>
                <div>
                    Cols: <input value={col} onChange={(e)=>setCol(e.target.value)} />
                </div>
                <div>
                    <button onClick={()=>{insertContent(createTable(Number(row),Number(col)))}}>Insert</button>
                </div>
            </div>
        </div>
    );
});
```

```css
.table-root {
    position: absolute;
    background-color: #e5e7eb;
    display: flex;
    width: 250px;
    height: 150px;
}

.center{
    display: flex;
    flex-direction: column;
    margin: auto;
}
```

`main.tsx`和上次基本一样，导入的文件变了而已

```typescript
import React, { useRef } from "react";
import { useAppVisible } from "./utils";
import { Table } from "./table";

function App() {
  const innerRef = useRef<HTMLDivElement>(null);
  const visible = useAppVisible();

  if (visible) {
    return (
      <main
        className="absolute inset-0"
        onClick={(e) => {
          if (!innerRef.current?.contains(e.target as any)) {
            window.logseq.hideMainUI();
          }
        }}
      >
        <Table ref={innerRef}  />
      </main>
    );
  }
  return null;
}

export default App;
```

## 让窗口出现在处

这次我们希望它像`emoji-picker`一样工作。窗口在光标的地方。我们直接从那边扒代码。

修改`table.tsx`

```typescript
export const Table = React.forwardRef<HTMLDivElement>(({}, ref) => {

    const [row, setRow] = React.useState("3");
    const [col, setCol] = React.useState("4");
    const [left, setLeft] = React.useState(0);
    const [top, setTop] = React.useState(0);
    const [rect, setReact] = React.useState({top:0,left:0});

    useEffect( ()=>{
        window.logseq.Editor.getEditingCursorPosition().then((res)=>{
            // @ts-ignore
            const {left, top, rect} = res;
            setLeft(left);
            setTop(top);
            setReact(rect);
        });
    },[])

    return(
        <div
            ref={ref}
            className="table-root"
             style={{ top: top + rect.top + 'px',
                 left: left + rect.left + 'px', }}
            >
            <div className="center">
                <div>
                    Rows: <input value={row} onChange={(e)=>setRow(e.target.value)}/>
                </div>
                <div>
                    Cols: <input value={col} onChange={(e)=>setCol(e.target.value)} />
                </div>
                <div>
                    <button onClick={()=>{insertContent(createTable(Number(row),Number(col)))}}>Insert</button>
                </div>
            </div>
        </div>
    );
});
```

![](../.gitbook/assets/21.gif)

现在工作的很好了

## 美化窗口

虽然现在一件插件的基本功能做到了，但是还是很丑。进行一番修改。

```html
            <div className="center">
                <div className="row">
                    Rows: <input value={row} onChange={(e)=>setRow(e.target.value)}/>
                </div>
                <div className="col">
                    Cols: <input value={col} onChange={(e)=>setCol(e.target.value)} />
                </div>
                <div>
                    <button className="button" onClick={()=>{insertContent(createTable(Number(row),Number(col)))}}>Insert</button>
                </div>
            </div>
```

```css
.table-root {
    position: absolute;
    background-color: #e5e7eb;
    display: flex;
    width: 250px;
    height: 150px;
    border-radius: 5px;

}

.center{
    display: flex;
    flex-direction: column;
    margin: auto;
}

.button{
    display: flex;
    margin: auto;
    border-radius: 5%;
    background-color: white;
    padding: 2px;
}
.row{
    padding: 2px;
    margin: auto;
}
.col{
    padding: 3px;
    margin: auto;
}
```

![](../.gitbook/assets/22.png)

虽然现在还是很丑，但是已经比之前好很多了。

## 注册快捷键

我们还希望能更方便一点。比如当我们按下`esc`时关闭窗口，按下`Enter`时就等于按下`insert`。

`esc`实现，在`main.tsx`中加入

```typescript
  document.addEventListener('keydown', function (e) {
    if (e.keyCode === 27) {
      logseq.hideMainUI({ restoreEditingCursor: true })
    }
    e.stopPropagation()
  }, false)
```

![](../.gitbook/assets/23.gif)

图：通过`esc`关闭窗口

`Enter`实现

`main.tsx`

```typescript
  document.addEventListener('keydown', function (e) {
    if (e.keyCode === 27) {
      logseq.hideMainUI({ restoreEditingCursor: true })
    }

    if (e.keyCode === 13) {
      // @ts-ignore
      logseq.emit('table_enter_down', e)
    }

    e.stopPropagation()
  }, false)
```

监听`Enter`事件。这里用到了`logseq`的`event`机制。通过`logseq.emit`提交事件。

在`table.tsx`组件里监听`logseq`其它地方发来的可能的监听事件。

这里之所以要`off`掉之前的事件，是因为有修改`row`或者`col`会挂载多个事件的。导致一按回车，触发多个事件。

```typescript
    useEffect(()=>{
        // @ts-ignore
        window.logseq.off("table_enter_down");

        // @ts-ignore
        window.logseq.once("table_enter_down", ()=>{
            insertContent(createTable(Number(row),Number(col)));
        })
    },[row, col])
```

![](../.gitbook/assets/24.gif)

现在就可以通过`esc`关闭窗口和`Enter`进行触发按扭了。
