# 发布你的logseq插件到markplace

https://github.com/logseq/marketplace

fork这个repo。在自己fork这个副本中`clone`到本地，在`packages`文件夹下建立你的`plugins`名的文件夹，在该文件夹下面建立`icon.png`文件和`manifest.json`文件。

文件内容类似下面：

```json
{
  "title": "插件名",
  "description": "插件描述" ,
  "author": "作者名",
  "repo":"github名/repo名)",
  "icon": "./图标名.png"
}
```

然后`git add` `git commit` `git push`。然后在`pull requests`中请求合并你的`plugins`。

## 发布插件的release


## logseq是如何下载你的插件的


## 发布的自动化