# datascript入门

本文高度未完成，想到哪写哪，暂时不建议看。目前没有教学意义

----------

### 在Logseq使用

datascript是一种`匹配`查询的语言,我们从最简单的语句开始，一步一步提高直到学会`datascript。

什么是匹配呢？我们设想Logseq的数据库是长这样的

| e-id | Attribute      | value    |
| ---- | -------------- | -------- |
| 50   | :block/parent  | 49       |
| 50   | :block/content | 大学数学 |
| 51   | :block/parent  | 50       |
| 51   | :block/content | 微积分   |
| 52   | :block/parent  | 50       |
| 52   | :block/content | 线代     |

这个表在`Logseq`中看起来是什么样的呢？是这样

28

我们构造这个命令

```
[:find ?e )
    :where
     [?e :block/parent 50]]
```

`[?e :block/parent 50]`意思就是匹配所有`block`中`parent`是`50`的节点。在我们这里表里面，结果有两个，分别是`51`和`52`。那么这个`?e`就是`变量`，它现在的值是`51`、`52`。

29

`(pull 变量名 [*])`这个`方法`的作用是把`变量名`所对应的`content`显示出来：

30

### Logseq block自带的属性

| :Namespace/Attribute | 可能的值\|示例          |
| :------------------- | ----------------------- |
| :block/uuid          |                         |
| :block/parent        | 50                      |
| :block/left          |                         |
| :block/collapsed?    |                         |
| :block/format        |                         |
| :block/refs          |                         |
| :block/_refs         |                         |
| :block/path-refs     |                         |
| :block/tags          |                         |
| :block/content       |                         |
| :block/marker        | "DONE"、"TODO"、"LATER" |
| :block/priority      |                         |
| :block/properties    |                         |
| :block/pre-block?    |                         |
| :block/scheduled     |                         |
| :block/deadline      |                         |
| :block/repeated?     |                         |
| :block/created-at    | 1644037172307           |
| :block/updated-at    | 1644037172307           |
| :block/file          |                         |
| :block/heading-level |                         |
