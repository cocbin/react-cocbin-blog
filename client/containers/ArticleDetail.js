'use strict';

import React,{Component} from 'react';
import marked from 'marked';

import {GET,API,POST} from '../tools/Fetch';
import Notification from '../components/Notification';
import './github.markdown.less';
import Copyright from './Copyright';
import {hasClass} from '../tools/DomOperation';

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: true,
    highlight: function (code) {
        if(typeof window !=="undefined" ){
            var highlightCode = hljs.highlightAuto(code,["javascript","html","shell"]);
            return highlightCode.value;
        }else{
            return code;
        }
    }
});

class ArticleDetail extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            article:this.props.location.state&&this.props.location.state.article,
            url:this.props.location.state&&this.props.location.state.url,
            isLoading:true
        }
    }

    componentDidMount() {
        this.refresh(this.props.params.id);
    }

    componentWillUpdate(nextProps){
        if(nextProps.params.id != this.props.params.id) {
            this.refresh(nextProps.params.id);
        }
    }

    refresh(id){

        this.setState({isLoading:true});
        GET(API.GET_ARTICLE,{id:id},(err,doc) => {
            if(err) {
                Notification.notice({
                    content:"获取文章失败,Err:"+err
                });
                this.setState({isLoading:false});
            } else {
                this.setState({
                    article:doc,
                    isLoading:false
                });
            }
        });
    }

    render() {
        let article = this.state.article;

        if(this.state.isLoading) {
            return (
                <div className = "spinner">
                    <div className = "spinner-container container1">
                        <div className = "circle1"></div>
                        <div className = "circle2"></div>
                        <div className = "circle3"></div>
                        <div className = "circle4"></div>
                    </div>
                    <div className = "spinner-container container2">
                        <div className = "circle1"></div>
                        <div className = "circle2"></div>
                        <div className = "circle3"></div>
                        <div className = "circle4"></div>
                    </div>
                    <div className = "spinner-container container3">
                        <div className = "circle1"></div>
                        <div className = "circle2"></div>
                        <div className = "circle3"></div>
                        <div className = "circle4"></div>
                    </div>
                </div>
            )
        } else {
            var content;
            //去标题
            content = article.content;
            var i =0;
            while(i<content.length) {
                if (content[i] == '\n') {
                    i++;
                } else {
                    break;
                }
            }
            if(content[i]=='#'&&content[i+1]!='#') {
                content = content.substr(i);
                content = content.substr(content.indexOf('\n'));
            }

            return (
                <div style = {{overflowY:'scroll',height:"100%",width:'100%'}}>
                    <div className = "markdown-body animated bounceInRight articleInner">
                        <div className = "articleCategoryBox">
                            <div className = "articleCategory">{article.category&&article.category.name}</div>
                        </div>
                        <div className = "articleTagsBox">
                            {
                                article.tags?article.tags.map((row,id)=>{
                                    return (
                                        <ArticleInfoRow
                                            key = {id}
                                            icon = {row.icon}
                                            content = {row.name}
                                        />
                                    )
                                }):""
                            }
                        </div>
                        <div className = "articleTitle" style = {{fontSize:'1.6em'}}>{article.title}</div>
                        <div className = "articleTagsRow clearfix">
                            <ArticleInfoRow
                                icon = "&#xe600;"
                                content = {new Date(article.date).pattern('MM, dd, yyyy')}
                            />
                            <ArticleInfoRow
                                icon = "&#xe603;"
                                content = { article.like + " LIKE"}
                            />
                            <ArticleInfoRow
                                icon = "&#xe601;"
                                content = { article.look + " LOOK"}
                            />
                        </div>
                        <div className = "clearfix" style = {{marginBottom:100}}></div>


                        <div dangerouslySetInnerHTML = {{__html:(marked(content))}}/>
                        <div ref = "dsBox" data-thread-key = {article._id} data-title= {article.title} data-url = {this.state.url||document.URL}></div>

                        <Copyright/>
                    </div>
                </div>
            );
        }
    }

    componentDidUpdate() {
        if(this.state.article) {
            //更新完毕后,加载多说评论
            var el = this.refs.dsBox.getDOMNode();
            //依赖多说  需要在html文件中引入多说评论的js文件
            DUOSHUO.EmbedThread(el);
            var that = this;
            //为喜欢按钮绑定事件
            var interval = setInterval(()=>{
                if(el.getElementsByClassName('ds-like-thread-button').length>0) {
                    clearInterval(interval);
                    var likeButton = el.getElementsByClassName('ds-like-thread-button')[0];
                    likeButton.onclick = function () {
                        if(hasClass(likeButton, "ds-thread-liked")) {
                            POST(API.LIKE_ARTICLE,{id:that.state.article._id,like:true},(err)=>{
                                if(err) {
                                    console.log(err);
                                }
                            });
                        } else {
                            POST(API.LIKE_ARTICLE,{id:that.state.article._id,like:false},(err)=>{
                                if(err) {
                                    console.log(err);
                                }
                            });
                        }
                    }
                }
            },100);
        }
    }
}


class ArticleInfoRow extends Component {
    render () {
        return (
            <div className = "articleTags">
                <i className = "iconfont" dangerouslySetInnerHTML = {{__html:this.props.icon}}/>
                <span>{this.props.content}</span>
            </div>
        )
    }
}

module .exports = ArticleDetail;