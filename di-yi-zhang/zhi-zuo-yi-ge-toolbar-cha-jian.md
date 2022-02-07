# 制作一个toolbar仪表盘

## 环境搭建

我们使用`logseq-plugin-template-react`为项目基础。

`git clone https://github.com/pengx17/logseq-plugin-template-react`

现在我们有了一个`手脚架`了。这个项目是用`pnpm`而不是传统的`npm`或者`yarn`，`pnpm`的优点大家使用之后一定会感觉到。使用方法和`npm`一致，把`npm`换成`pnpm`就行。

`pnpm install`安装依赖

## 项目结构

```
➜  logseq-plugin-template-react git:(master) tree -L 2
.
├── CHANGELOG.md
├── index.html
├── logo.svg
├── package.json
├── pnpm-lock.yaml
├── readme.md
├── release.config.js
├── renovate.json
├── src
│   ├── App.tsx # 页面代码写这，但是组件一般新建tsx。
│   ├── main.tsx # toolbar代码写这
│   └── utils.ts
├── tsconfig.json
└── vite.config.ts

1 directory, 13 files
```

## 注册toolbar

在`` main.tsx` ``

```javascript
  logseq.provideStyle(css`
    .${openIconName} {
      width: 18px;
      height: 18px;
      margin: 2px 0.4em 0 0.4em;
      background-color: blue;
      border-radius: 4px;
      border: 1px solid #eee;
    }
  `);

  logseq.App.registerUIItem("toolbar", {
    key: "heatmap-plugin-open",
    template: `
    <a data-on-click="show">
      <div class="${openIconName}"></div>
    </a>
  `,
  });
```



## 新建页面

### 页面位置

### 页数内容
