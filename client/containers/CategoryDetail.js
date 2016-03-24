'use strict';

import React ,{Component} from 'react';
import {Link} from 'react-router';
import Notification from '../components/Notification';
import Copyright from './Copyright';
import ArticleRow from './ArticleRow';

import {GET,API} from '../tools/Fetch';

import {addClass,removeClass,hasClass} from '../tools/DomOperation';

class CategoryDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            articles:[],
            onLoadding:false,
            hasLoadAll:false
        };
        this.page = 1;
        this.id = this.props.params.id;
    }

    componentWillUpdate(nextProps){
        if(nextProps.params.id != this.props.params.id) {
            this.id = nextProps.params.id;
            this.refresh();
        }
    }

    componentDidMount() {
        this.refresh();
    }

    refresh(){
        this.page = 1;
        //刷新类别搜索内容
        this.getArticleList();

        //刷新动画
        var box = this.refs.cateDetailBox.getDOMNode();
        if(box) {
            removeClass(box,"bounceInRight");

            setTimeout(()=>{
                //find category by id
                addClass(box,"bounceInRight");
            },100);
        }
    }


    loadMore() {
        this.page++;
        this.getArticleList();
    }

    getArticleList() {
        GET(API.GET_ARTICLE_LIST,{cateid:this.id,page:this.page,pagesize:20},(err,docs) => {
            if(err) {
                Notification.notice({
                    content:"文章获取失败,ERR:"+err
                });
            } else {
                if(this.page == 1) {
                    this.setState({
                        articles:docs,
                        hasLoadAll: false
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
        return (
            <div ref = "cateDetailBox"
                 className = "cateDetailBox animated"
                 style = {{overflowY:'scroll'}}
                 onScroll = {this.onScroll.bind(this)}>
                <ul className = "articleinner">
                    {this.state.articles.map((row,key) =><ArticleRow article = {row} key = {key}/>)}
                </ul>
                {this.state.onLoadding&&
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
                </div>}
                {this.state.hasLoadAll&&<div className = "noMore">没有更多文章了</div>}

                <Copyright/>
            </div>
        );
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

module.exports = CategoryDetail;
