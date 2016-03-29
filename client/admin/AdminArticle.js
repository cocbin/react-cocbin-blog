'use strict';

import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import Date from '../tools/Date';
import {addClass, removeClass} from '../tools/DomOperation';
import './AdminArticle.less';

import {
    fetchStaticDataIfNeed,
    removeOneThing,
    showConfirm,
    refreshArticleList,
    loadMoreArticleList
} from '../actions';

class AdminArticle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedCateValue:undefined,
            selectedCate:undefined,
            selectedTagValue:undefined,
            selectedTag:undefined,
            onLoadding:false,
            hasLoadAll:false
        };
        this.id = this.props.params.id;
        this.shouldRefresh = true;
    }

    componentDidMount() {
        this.getArticles();
        this.props.initCategory();
        this.props.initTags();
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

        if(this.shouldRefresh) {
            this.props.refreshArticle(params);
            this.shouldRefresh = false;
        } else {
            this.props.loadMoreArticle(params);
        }
    }

    render() {

        if (!this.props.logged) {
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
                                    {this.props.category.map((row,key)=>this.renderOptions(row,key,"cate"))}
                                </ul>
                            </div>
                            <div className = "selector">
                                <button onFocus = {this.openSelectOptions} onBlur = {this.closeSelectOptions}>
                                    {this.state.selectedTagValue||"Tag"}
                                    <span className = "selectorTriangle"/>
                                </button>
                                <ul className = "selectorOptions">
                                    {this.props.tags.map((row,key)=>this.renderOptions(row,key,"tag"))}
                                </ul>
                            </div>
                            <Link to = "/article/write">
                                <button className = "btn" style = {{float:'right',width:120,margin:8}}>Write</button>
                            </Link>
                        </div>
                        <div className="clearfix" style = {{marginTop:20}}>
                            <table>
                                <tbody>
                                <tr>
                                    <th>日期</th>
                                    <th>文章</th>
                                    <th>类别</th>
                                    <th>标签</th>
                                    <th>操作</th>
                                </tr>

                                {this.props.articles.map((article,key)=>{
                                    return this.renderArticle(article,key);
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {this.props.isFetching&&<div className = "loadMore">加载更多中</div>}
                    {this.props.noMore&&<div className = "noMore">没有更多文章了</div>}
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
            this.shouldRefresh = true;
            this.getArticles('cate',row);
        } else {
            this.setState({
                selectedTag:row,
                selectedTagValue:row.name
            });
            this.shouldRefresh = true;
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
                    <button className = "btndel" style = {{width:120,height:30}} onClick = {this.props.removeArticle.bind(this,article._id)}>删除</button>
                </td>
            </tr>
        )
    }

    onScroll(e) {

        if(this.props.isFetching == true||this.props.noMore) {
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
            this.getArticles();
        }
    }
}

AdminArticle.propTypes = {
    articles: PropTypes.array.isRequired,
    category: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    initCategory: PropTypes.func.isRequired,
    logged: PropTypes.bool.isRequired
};

export default connect(state => ({
    articles: state.articleList.admin ? state.articleList.admin.dataList : [],
    category: state.common.category ? state.common.category.dataList : [],
    tags: state.common.tags ? state.common.tags.dataList : [],
    logged: state.login.logged ? state.login.logged : false,
    isFetching: state.articleList.admin ? state.articleList.admin.isFetching : false,
    noMore: state.articleList.admin ? state.articleList.admin.noMore : false
}), dispatch => ({
    initCategory: () => dispatch(fetchStaticDataIfNeed('category')),
    initTags: () => dispatch(fetchStaticDataIfNeed('tags')),
    removeArticle: (id) => {
        dispatch(showConfirm('删除文章', '是否确定删除文章', removeOneThing.bind(this, 'article', id)));
    },
    refreshArticle: (params)=>dispatch(refreshArticleList('admin', params)),
    loadMoreArticle: (params)=>dispatch(loadMoreArticleList('admin', params))
}))(AdminArticle);
