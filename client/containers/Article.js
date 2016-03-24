`use strict`;

import React ,{Component} from 'react';
import ArticleRow from './ArticleRow';
import Notification from '../components/Notification';
import Copyright from './Copyright';

import {GET,POST,API} from '../tools/Fetch';

class Article extends Component {

    constructor (props) {
        super(props);
        this.state = {
            articles:[],
            onLoadding:false,
            hasLoadAll:false
        };
        this.page = 1;
    }

    componentDidMount() {

        if(this.props.params.id) {
           return ;
        } else {
            this.getArticleList(1);
        }
    }

    loadMore() {
        this.page++;
        this.getArticleList(this.page);
    }

    getArticleList(page) {
        GET(API.GET_ARTICLE_LIST,{page:page,pagesize:20},(err,docs) => {
            if(err) {
                Notification.notice({
                    content:"文章获取失败,ERR:"+err
                });
            } else {
                if(page==1) {
                    this.setState({
                        articles:docs
                    });
                } else {
                    if(docs.length == 0) {
                        this.setState({
                            hasLoadAll:true,
                            onLoadding:false
                        });
                    } else {
                        var articles = this.state.articles;
                        articles = articles.concat(docs);
                        this.setState({
                            articles:articles,
                            onLoadding:false
                        });
                    }
                }
            }
        })
    }

    render() {
        if(this.props.params.id) {
            return (
                <div>
                    {this.props.children}
                </div>
            )
        } else {
            var articleList = this.state.articles?this.state.articles.map((row,id)=>{
                return  <ArticleRow article = {row} key = {id}/>
            }):<div/>;

            return(
                <div
                     style = {{overflowY:'scroll',width:'100%',height:'100%'}}
                     onScroll = {this.onScroll.bind(this)}>
                    <div
                         className = "animated bounceInRight">
                        {this.props.children}
                        {articleList}
                        {this.state.onLoadding&&<div class="spinner">
                            <div class="spinner-container container1">
                                <div class="circle1"></div>
                                <div class="circle2"></div>
                                <div class="circle3"></div>
                                <div class="circle4"></div>
                            </div>
                            <div class="spinner-container container2">
                                <div class="circle1"></div>
                                <div class="circle2"></div>
                                <div class="circle3"></div>
                                <div class="circle4"></div>
                            </div>
                            <div class="spinner-container container3">
                                <div class="circle1"></div>
                                <div class="circle2"></div>
                                <div class="circle3"></div>
                                <div class="circle4"></div>
                            </div>
                        </div>}
                        {this.state.hasLoadAll&&<div className = "noMore">没有更多文章了</div>}

                        <Copyright/>
                    </div>
                </div>
            )
        }
    }

    onScroll(e){


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


}

module .exports = Article;