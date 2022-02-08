# 发布你的logseq插件到markplace

https://github.com/logseq/marketplace

fork这个repo。

然后在git到本地，在`packages`文件夹下建立你的`plugins`名的文件夹，在该文件夹下面建立`icon.png`文件和`manifest.json`文件。

文件内容如下：

```json
{
  "title": "Dev theme",
  "description": "A theme inspired by Dev.to & Figma." ,
  "author": "pengx17",
  "repo":"pengx17/logseq-dev-theme",
  "icon": "icon.png",
  "theme": true
}
```



然后`git add` `git commit` `git push`。

然后在该页面的`pull requests`中请求合并你的`plugins`。
