# 懒加载与异常处理

## 什么是懒加载
React16为我们引进了两个新feature:`Lazy`和`Suspense`。让我们可以较为方便地在加载需要等待的组件时显示`Loading`或者其它界面。

让我们看看隔壁著名的`logseq-plugin-heatmap`插件是如何使用的。

```jsx
//App.tsx

const Heatmap = React.lazy(() =>
  import("./Heatmap").then((d) => ({ default: d.Heatmap }))
);

...略

<React.Suspense fallback="loading...">
    <main ...略
        >
        <Heatmap ref={innerRef} />
    </main>
</React.Suspense>
```


一个更直观的例子来自[react docs](https://beta.reactjs.org/reference/react/lazy)
```jsx
const MarkdownPreview = lazy(() => delayForDemo(import('./MarkdownPreview.js')));

...
<Suspense fallback={<Loading />}>
    <h2>Preview</h2>
    <MarkdownPreview markdown={markdown} />
</Suspense>
```

![](../.gitbook/assets/43.gif)

## 异常处理
与`Lazy`和`Suspense`对比，用起来挺像的`ErrorBoundary`，这个可以为我们在组件出现错误时，提供另一些东西，比如显示错误提示等等。

用例
```jsx
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
...

// 当出错时显示的内容
function ErrorFallback({ error }: FallbackProps) {
  return (
    <div role="alert" className="text-red-500 font-semibold">
      <p>
        Heatmap failed to render. Can you re-index your graph and try again?
      </p>
    </div>
  );
}
...

<ErrorBoundary FallbackComponent={ErrorFallback}>

    // 你的UI代码
    <DateRange range={range} onRangeChange={setRange} today={today} />
    {range && (
        <HeatmapChart today={today} endDate={range[1]} startDate={range[0]} />
    )}

</ErrorBoundary>
```

## 应用
这两个东西都是非常的简单明了，可以直接方便的用在那些需要的组件上。不需要什么特别的演示👐。
