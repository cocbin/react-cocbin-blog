# jsblog 博客系统

> 本文将跟进项目进度，实时同步更新

``` js
addEventListener('load', function() {
  var code = document.querySelector('#code');
  var worker = new Worker('worker.js');
  worker.onmessage = function(event) { code.innerHTML = event.data; }
  worker.postMessage(code.textContent);
})

```

``` html
<h1>
  <a name="heading-" class="anchor" href="#heading-">
    <span class="header-link"></span>
  </a>
  heading+
</h1>
```
## 构想
目前的想法是，构建一个轻量级的博客应用。

构建技术暂时定位NodeJS，如果需要数据库的话，就使用mongodb，或者直接使用文件系统。

前端则使用react来构建，这样就可以做到无刷新，提供良好的用户体验。

全页面使用markdown语法，带一个markdown编辑器，可以在线编辑。

当然最重要的一点是要易于发布，目前的想法是想办法结合git，这样还能做到版本控制，实在不行的话我将发布一个发布博客的应用，用于快速发布博客。

另外的想法是实现MetawebblogAPI，这样子很容易和第三方应用对接起来。

## 功能设计


![js_blog](media/14571452671180/js_blog.png)

## 功能实现

### 搭建前端环境
React环境的搭建


