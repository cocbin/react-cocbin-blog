'use strict';

import React , {Component} from 'react';
import Copyright from '../Copyright';

class About extends Component {

    render() {
        return (
            <div className = "animated bounceInRight" style = {{overflowY:'scroll',height:"100%"}}>
                <div className = "line"><span>ABOUT COCBIN'S BLOG</span></div>
                <div className = "aboutInfo">
                    <p>
                        Cocbin's blog，是一个高度组件化，轻量级、高性能、开源的单页博客系统。由Cocbin自2016年3月份起开始开发的。该博客系统的主要特色有：简单美观的UI界面，人性化的发布流程，极易维护。
                    </p>
                    <p>
                        项目地址:https://github.com/cocbin/cocbin-blog
                    </p>
                    <p>
                        博客使用的技术栈如下，前端使用了ReactJS构建页面，服务端则使用Express对外提供API，数据库使用了Mongodb，前后端交互遵循RESTful API规范。整套系统都是由JavaScript开发的，使得前端人员很轻易地就能够进行拓展。
                    </p>
                    <p>
                        博客前端使用Webpack进行打包，每个组件相关的文件都放置在同一个文件夹，由Webpack负责模块加载。这样一来，需要修改某个组件，只要找到相应的文件夹就能够轻易的修改了。
                    </p>
                    <p>
                        博客页面通过Markdown编辑器进行发布，博主只需要将写好的Markdown文档发布，该博客系统将自动转换为HTML文档。同时，还可以轻松地自定义Markdown主题，和代码高亮主题。
                    </p>
                    <p>
                        博客内置了分类系统和标签系统，使用者很轻易就能够将自己的博客分门别类地整理出来。分类通过以icon的形式展示出来，很容易识别分类或标签，同时也增加了博客的美感。
                    </p>
                </div>
                <Copyright/>
            </div>
        );
    }
}

module .exports = About;