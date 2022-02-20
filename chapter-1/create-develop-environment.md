# 搭建开发环境

## logseq环境搭建

在设置中`advanced`栏打开`Developer mode`



## 普通插件

使用[ logseq-plugin-samples](https://github.com/logseq/logseq-plugin-samples)里的中的代码为基础改动就好。

如`logseq-pomodoro-timer`和`logseq-emoji-picker`都比如简单。

### 提高logseq lib 版本

上面那些样例中`@logseq/libs`版本比较低。

在`package.js`中直接更新就行。在[npm](https://www.npmjs.com/package/@logseq/libs?activeTab=readme)这里可以看到最新的版本



## 基于react开发的插件

使用`logseq-plugin-template-react`

获取手脚架

```
`git clone https://github.com/pengx17/logseq-plugin-template-react`
```

安装`pnpm`

`npm install -g pnpm`
