'use strict';

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import Copyright from './Copyright';
import ArticleRow from './ArticleRow';
import Loadding from '../components/Loadding';
import {addClass, removeClass} from '../tools/DomOperation';
import {refreshArticleList, loadMoreArticleList} from '../actions';

class CategoryDetail extends Component {

    constructor(props) {
        super(props);
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
        this.props.refreshArticle(this.id);

        //刷新动画
        var box = this.refs.cateDetailBox;
        if(box) {
            removeClass(box,"bounceInRight");
            setTimeout(()=>{
                addClass(box,"bounceInRight");
            },100);
        }
    }

    render() {
        return (
            <div ref = "cateDetailBox"
                 className = "cateDetailBox animated"
                 style = {{overflowY:'scroll'}}
                 onScroll = {this.onScroll.bind(this)}>
                <ul className = "articleinner">
                    {this.props.articles.map((row, key) =><ArticleRow article={row} key={key}/>)}
                </ul>
                {this.props.isFetching && Loadding}
                {this.props.noMore && <div className="noMore">没有更多文章了</div>}
                <Copyright/>
            </div>
        );
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
            this.props.loadMoreArticle(this.id);
        }
    }
}

CategoryDetail.propTypes = {
    articles: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    noMore: PropTypes.bool.isRequired,
    refreshArticle: PropTypes.func.isRequired,
    loadMoreArticle: PropTypes.func.isRequired
};

export default connect(state => ({
    articles: state.articleList.category ? state.articleList.category.dataList : [],
    isFetching: state.articleList.category ? state.articleList.category.isFetching : false,
    noMore: state.articleList.category ? state.articleList.category.noMore : false
}), dispatch => ({
    refreshArticle: (id)=>dispatch(refreshArticleList('category', {cateid: id})),
    loadMoreArticle: (id)=>dispatch(loadMoreArticleList('category', {cateid: id}))
}))(CategoryDetail);