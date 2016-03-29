'use strict';

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {refreshArticleList, loadMoreArticleList} from '../actions';
import ArticleRow from './ArticleRow';
import Copyright from './Copyright';
import Loadding from '../components/Loadding';
import {addClass, removeClass} from '../tools/DomOperation';

class TagsDetail extends Component {

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
        //refresh animation
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
                <ul className = "articleInner" >
                    {this.props.articles.map((row, key) => <ArticleRow article={row} key={key}/>)}
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

TagsDetail.propTypes = {
    articles: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    noMore: PropTypes.bool.isRequired,
    refreshArticle: PropTypes.func.isRequired,
    loadMoreArticle: PropTypes.func.isRequired
};

export default connect(state => ({
    articles: state.articleList.tags ? state.articleList.tags.dataList : [],
    isFetching: state.articleList.tags ? state.articleList.tags.isFetching : false,
    noMore: state.articleList.tags ? state.articleList.tags.noMore : false
}), dispatch => ({
    refreshArticle: (id)=>dispatch(refreshArticleList('tags', {tagsid: id})),
    loadMoreArticle: (id)=>dispatch(loadMoreArticleList('tags', {tagsid: id}))
}))(TagsDetail);
