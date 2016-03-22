'use strict';

import React, {Component} from 'react';
import {Link} from 'react-router';
import Date from '../Date';
import notification from '../Notification';
import Confirm from '../Confirm';

import {addClass,removeClass,hasClass} from '../DomOperation';
import {GET,POST,API} from '../Fetch';


import './AdminArticle.less';


class AdminArticle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedCateValue:undefined,
            selectedCate:undefined,
            selectedTagValue:undefined,
            selectedTag:undefined,
            category:[],
            tags:[],
            articles:[],
            onLoadding:false,
            hasLoadAll:false
        };

        this.page = 1;
        this.id = this.props.params.id;
    }

    loadMore() {
        this.page++;
        this.getArticles();
    }

    componentDidMount() {

        if(!API.LOGGED) {
            return ;
        }

        //获取标签
        GET(API.GET_TAGS,undefined,(err,docs) => {
            if(err) {
                notification.notice({
                    content:"标签获取失败,ERR:"+err
                });
            } else {
                this.setState({
                    tags:docs
                });
            }
        });

        //获取类别
        GET(API.GET_CATEGORY,undefined,(err,docs) => {
            if(err) {
                notification.notice({
                    content:"类别获取失败,ERR:"+err
                });
            } else {
                this.setState({
                    category:docs
                });
            }
        });

        this.getArticles();
    }

    getArticles(method,data) {
        var params = {};
        if(method){
            if(method == 'cate') {
                params['cateid'] = data._id;
                if(this.state.selectedTag) {
                    params['tagsid'] = this.state.selectedTag._id;
                }
            } else {
                params['tagsid'] = data._id;
                if(this.state.selectedCate) {
                    params['cateid'] = this.state.selectedCate._id;
                }
            }
        } else {
            if(this.state.selectedCate) {
                params['cateid'] = this.state.selectedCate._id;
            }
            if(this.state.selectedTag) {
                params['tagsid'] = this.state.selectedTag._id;
            }
        }
        params['page'] = this.page;
        params['pagesize'] = 20;
        GET(API.GET_ARTICLE_LIST,params,(err,docs) => {
             if(err) {
                 notification.notice({
                     content:"文章获取失败,ERR:"+err
                 });
             } else {
                 if(this.page == 1) {
                     this.setState({
                         articles:docs,
                         hasLoadAll: false
                     });
                 } else {
                     if (docs.length == 0) {
                         this.setState({
                             hasLoadAll: true,
                             onLoadding: false
                         });
                     } else {
                         var articles = this.state.articles;
                         articles = articles.concat(docs);
                         this.setState({
                             articles: articles,
                             onLoadding: false
                         });
                     }
                 }
             }
        });

    }

    render() {

        if(!API.LOGGED) {
            return <div>权限不足</div>
        }

        return (
            <div id="adminArticleBox" className = "animated bounceInRight clearfix">
                <div style = {{overflowY:'scroll',height:'100%'}}
                     onScroll = {this.onScroll.bind(this)}>
                    <h3 className = "formTitle" >Article Manager</h3>
                    <div className = "articleInner">
                        <div className = "clearfix">
                            <div className = "selector">
                                <button onFocus = {this.openSelectOptions} onBlur = {this.closeSelectOptions}>
                                    {this.state.selectedCateValue||"Category"}
                                    <span className = "selectorTriangle"/>
                                </button>
                                <ul className = "selectorOptions">
                                    {this.state.category.map((row,key)=>this.renderOptions(row,key,"cate"))}
                                </ul>
                            </div>
                            <div className = "selector">
                                <button onFocus = {this.openSelectOptions} onBlur = {this.closeSelectOptions}>
                                    {this.state.selectedTagValue||"Tag"}
                                    <span className = "selectorTriangle"/>
                                </button>
                                <ul className = "selectorOptions">
                                    {this.state.tags.map((row,key)=>this.renderOptions(row,key,"tag"))}
                                </ul>
                            </div>
                            <Link to = "/article/write">
                                <button className = "btn" style = {{float:'right',width:120,margin:8}}>Write</button>
                            </Link>
                        </div>
                        <div className="clearfix" style = {{marginTop:20}}>
                            <table>
                                <tr>
                                    <th>日期</th>
                                    <th>文章</th>
                                    <th>类别</th>
                                    <th>标签</th>
                                    <th>操作</th>
                                </tr>

                                {this.state.articles.map((article,key)=>{
                                    return this.renderArticle(article,key);
                                })}
                            </table>
                        </div>
                    </div>
                    {this.state.onLoadding&&<div className = "loadMore">加载更多中</div>}
                    {this.state.hasLoadAll&&<div className = "noMore">没有更多文章了</div>}
                </div>
            </div>
        )
    }

    renderOptions(row,key,mothed){
        return (
            <li key = {key} onClick = {this.onSelect.bind(this,row,mothed)}>
                <i className = "iconfont" dangerouslySetInnerHTML = {{__html:(row.icon)}}/>
                <span className = "content">{row.name}</span>
            </li>
        );
    }

    openSelectOptions(e){
        let optionBox = e.target.parentNode.getElementsByClassName('selectorOptions')[0];
        addClass(optionBox,'active');
    }

    closeSelectOptions(e) {
        let optionBox = e.target.parentNode.getElementsByClassName('selectorOptions')[0];
        setTimeout(()=>{
            removeClass(optionBox,'active');
        },200);
    }

    onSelect(row,mothed){
        if(mothed == 'cate') {
            this.setState({
                selectedCate:row,
                selectedCateValue:row.name
            });
            this.page = 1;
            this.getArticles('cate',row);
        } else {
            this.setState({
                selectedTag:row,
                selectedTagValue:row.name
            });
            this.page = 1;
            this.getArticles('tag',row);
        }
    }

    renderArticle(article,key){

        var tags = article.tags.length>0?article.tags[0].name:"";
        for(var i = 1;i<article.tags.length;i++) {
            tags += "," + article.tags[i].name;
        }

        return (
            <tr key = {key}>
                <td>{new Date(article.date).pattern("yyyy/M/dd")}</td>
                <td>{article.title}</td>
                <td>{article.category&&article.category.name}</td>
                <td>
                    {tags}
                </td>
                <td>
                    <Link to = {"/article/edit/" + article.id}><button className = "btn" style = {{width:120,height:30}}>编辑</button></Link>
                    <button className = "btndel" style = {{width:120,height:30}} onClick = {this.removeArticle.bind(this,article._id,key)}>删除</button>
                </td>
            </tr>
        )
    }

    onScroll(e) {

        if(this.state.onLoadding == true||this.state.hasLoadAll) {
            return ;
        }

        var scrollTop = e.target.scrollTop;
        if(this.lastScrollTop&&this.lastScrollTop-scrollTop > 0) {
            this.lastScrollTop = scrollTop;
            return ;
        }

        this.lastScrollTop = scrollTop;

        var clientHeight = e.target.firstChild.clientHeight;
        var offsetHeight = e.target.offsetHeight;

        if(clientHeight - scrollTop - offsetHeight < 100) {
            this.setState({
                onLoadding:true
            });
            this.loadMore();
        }
    }

    removeArticle(id,pos) {
        Confirm.show({
            title:"删除文章",
            content:"是否确定删除选中的文章",
            callback:(result)=>{
                if(result) {
                    POST(API.REMOVE_ARTICLE,{id:id},(err) => {
                        if(err) {
                            notification.notice({
                                content:"删除文章失败,Err:"+err
                            });
                        } else {
                            var newArticle = this.state.articles;
                            newArticle.splice(pos,1);
                            this.setState({
                                articles:newArticle
                            });
                            notification.notice({
                                content:"删除文章成功!"
                            });
                        }
                    })
                }
            }
        });
    }
}


module .exports = AdminArticle;