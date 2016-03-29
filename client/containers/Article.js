'use strict';

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import ArticleRow from './ArticleRow';
import Copyright from './Copyright';
import Loadding from '../components/Loadding';
import {refreshArticleList, loadMoreArticleList} from  '../actions';

class Article extends Component {

    constructor (props) {
        super(props);
    }

    componentDidMount() {

        if(this.props.params.id) {
           return ;
        } else {
            this.props.refreshArticle();
        }
    }

    render() {
        if(this.props.params.id) {
            return (
                <div>
                    {this.props.children}
                </div>
            )
        } else {
            return (
                <div
                     style = {{overflowY:'scroll',width:'100%',height:'100%'}}
                     onScroll = {this.onScroll.bind(this)}>
                    <div
                         className = "animated bounceInRight">
                        {
                            this.props.articles ? this.props.articles.map((row, id)=> {
                                return <ArticleRow article={row} key={id}/>
                            }) : ""
                        }
                        {this.props.isFetching && Loadding}
                        {this.props.noMore && <div className="noMore">没有更多文章了</div>}
                        <Copyright/>
                    </div>
                </div>
            )
        }
    }

    onScroll(e){
        if (this.props.isFetching == true || this.props.noMore) {
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
            this.props.loadMoreArticle();
        }
    }
}

Article.propTypes = {
    articles: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    noMore: PropTypes.bool.isRequired,
    refreshArticle: PropTypes.func.isRequired,
    loadMoreArticle: PropTypes.func.isRequired
};

export default connect(state => ({
    articles: state.articleList.home ? state.articleList.home.dataList : [],
    isFetching: state.articleList.home ? state.articleList.home.isFetching : false,
    noMore: state.articleList.home ? state.articleList.home.noMore : false
}), dispatch => ({
    refreshArticle: ()=>dispatch(refreshArticleList('home', {})),
    loadMoreArticle: ()=>dispatch(loadMoreArticleList('home', {}))
}))(Article);