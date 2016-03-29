'use strict';

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import marked from 'marked';

import {fetchArticleIfNeed, likeOrDislikeArticle} from '../actions';
import Loadding from '../components/Loadding';
import Copyright from './Copyright';
import {hasClass} from '../tools/DomOperation';

import './github.markdown.less';

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
    }

    componentDidMount() {
        this.refresh(this.props.params.id);
    }

    componentWillUpdate(nextProps){
        if(nextProps.params.id != this.props.params.id) {
            this.refresh(nextProps.params.id);
        }
    }

    refresh(id) {
        this.props.fetchArticleIfNeed(id);
    }

    render() {
        let article = this.props.articles[this.props.params.id];

        if (this.props.isFetching) {
            return Loadding;
        } else {
            if (!article) {
                return <div>404</div>;
            }
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
                        <div ref="dsBox" data-thread-key={article._id} data-title={article.title}
                             data-url={document.URL}></div>

                        <Copyright/>
                    </div>
                </div>
            );
        }
    }

    componentDidUpdate() {
        const article = this.props.articles[this.props.params.id];
        if (article) {
            //更新完毕后,加载多说评论
            var el = this.refs.dsBox;
            //依赖多说  需要在html文件中引入多说评论的js文件
            DUOSHUO.EmbedThread(el);
            var that = this;
            //为喜欢按钮绑定事件
            var times = 0;
            if(el)
            var interval = setInterval(()=>{
                times++;
                if(el.getElementsByClassName('ds-like-thread-button').length>0) {
                    clearInterval(interval);
                    var likeButton = el.getElementsByClassName('ds-like-thread-button')[0];
                    likeButton.onclick = function () {
                        if(hasClass(likeButton, "ds-thread-liked")) {
                            that.props.likeOrDislikeArticle(article._id, true);
                        } else {
                            that.props.likeOrDislikeArticle(article._id, false);
                        }
                    }
                }
                if(times>20) {
                    clearInterval(interval);
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

ArticleDetail.propTypes = {
    articles: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    fetchArticleIfNeed: PropTypes.func.isRequired,
    likeOrDislikeArticle: PropTypes.func.isRequired
};

export default connect(state => ({
    articles: state.articles.articles ? state.articles.articles : {},
    isFetching: state.articles.isFetching ? state.articles.isFetching : false
}), dispatch => ({
    fetchArticleIfNeed: (id)=>dispatch(fetchArticleIfNeed(id)),
    likeOrDislikeArticle: likeOrDislikeArticle
}))(ArticleDetail);