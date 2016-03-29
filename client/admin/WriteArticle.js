import React, {Component,PropTypes} from 'react';
import {connect} from 'react-redux';

import {addClass,removeClass,hasClass} from '../tools/DomOperation';
import {
    fetchStaticDataIfNeed,
    showConfirm,
    fetchArticleIfNeed,
    editOneThing,
    showNotification,
    addOneThing
} from '../actions';

import './WriteArticle.less';

class WriteArticle extends Component {

    constructor (props){
        super(props);

        this.state = {
            selectCate:undefined,
            selectTags:[],
            cateSelecterShow:false,
            tagsSelecterShow:false,
            title:undefined,
            content:undefined,
            description:undefined
        };
    }

    refresh(id){
        this.props.fetchArticleIfNeed(id);
    }

    componentDidMount() {
        this.props.initCategory();
        this.props.initTags();

        if(this.props.params.id) {
            this.refresh(this.props.params.id);
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.props.params.id&&nextProps.articles[this.prps.params]) {
            let article = nextProps.articles[this.props.params.id];
            this.setState({
                selectCate:article.category,
                selectTags:article.tags,
                title:article.title,
                description:article.description,
                content:article.content
            });
        }
    }

    render() {
        if (!this.props.logged) {
            return <div>权限不足</div>
        }

        return (
        <div className = "animated bounceInRight wrtieArticle">

            <h3  className = "formTitle">文章编辑器</h3>

            <div className = "inputBox" style = {{marginTop:40}}>
                <i className = "iconfont">&#xe66d;</i>
                <input
                    type = "text"
                    placeholder = "Title"
                    name = "title"
                    onChange = {this.onTextChange.bind(this)}
                    value = {this.state.title}/>
            </div>

            <div className="inputBox" style = {{position: "relative"}}
                 onFocus = {()=>this.setState({cateSelecterShow:true})}
                 onBlur = {()=>setTimeout(()=>this.setState({cateSelecterShow:false}),200)}>
                <i className = "iconfont">&#xe669;</i>
                <input
                    type = "text"
                    placeholder = "Category"
                    value = {this.state.selectCate?this.state.selectCate.name:""}
                    readOnly/>
                <ul className = "writeSelectorOptions" style = {{display:this.state.cateSelecterShow?"block":"none"}}>
                    {this.props.category.map((row,key)=>this.renderWritePadOptions(row,key,"cate"))}
                </ul>
            </div>

            <div className = "inputBox" style = {{position:"relative"}}
                 onFocus = {()=>this.setState({tagsSelecterShow:true})}>
                <i className = "iconfont">&#xe66e;</i>
                <input type = "text"
                       placeholder = "Tags"
                       readOnly
                       value = {(()=>{
                            var tags = this.state.selectTags.length>0?this.state.selectTags[0].name:"";
                            for(var i = 1;i<this.state.selectTags.length;i++) {
                                tags += ","+this.state.selectTags[i].name;
                            }
                            return tags;
                        })()}/>
                <ul className = "writeSelectorOptions" ref = "tagsView" style = {{display:this.state.tagsSelecterShow?"block":"none"}}>
                    <li style = {{background:"#fff"}} onClick = {()=>this.setState({tagsSelecterShow:false})}>
                        <span className = "iconfont">&#xe60e;</span>
                        <span className = "content">点击此处完成选择</span>
                    </li>
                    {this.props.tags.map((row,key)=>this.renderWritePadOptions(row,key,"tags"))}
                </ul>
            </div>

            <div className="clearfix"/>

            <div className = "inputBox">
                <i className = "iconfont" style = {{height:100,lineHeight:"100px"}}>&#xe66c;</i>
                <textarea
                    type = "text"
                    placeholder = "Description"
                    name = "description"
                    onChange = {this.onTextChange.bind(this)}
                    value = {this.state.description}/>
            </div>

            <div className="clearfix"/>

            <div className = "inputBox">
                <i className = "iconfont" style = {{height:240,lineHeight:"240px"}}>&#xe66c;</i>
                <textarea
                    type = "text"
                    placeholder = "Detail"
                    name = "content"
                    onChange = {this.onTextChange.bind(this)}
                    style = {{height:224}}
                    value = {this.state.content}/>
            </div>

            <div className="clearfix"/>

            <button className = "btn" style = {{width:660,margin:'0 auto 50px',display:'block'}} onClick = {this.submitArticle.bind(this)}>
                {this.props.params.id?'修改文章':'发布文章'}
            </button>
        </div>);
    }

    renderWritePadOptions(row,key,mothed){
        return (
            <li key = {key} onClick = {this.onWritePadSelect.bind(this,row,mothed)}>
                <span className = "iconfont" dangerouslySetInnerHTML = {{__html:(row.icon)}}/>
                <span className = "content">{row.name}</span>
            </li>
        );
    }


    onWritePadSelect(row,mothed,e) {
        if(mothed == 'cate') {
            this.setState({
                selectCate:row
            });
        }else {
            var tagsArr = this.state.selectTags;
            var target = e.target;

            if(target.tagName!="LI") {
                target = target.parentNode;
            }

            if(hasClass(target,'active')) {
                removeClass(target,'active');
                for(var i = 0;i < tagsArr.length;i++) {
                    if(tagsArr[i].name == row.name) {
                        tagsArr.splice(i,1);
                        break;
                    }
                }
            }else {
                addClass(target,'active');
                tagsArr.push(row);
            }

            this.setState({
                selectTags:tagsArr
            });
        }
    }

    onTextChange(e){
        var name = e.target.name;
        var value = e.target.value;
        var state = this.state;
        state[name] = value;
        this.setState(state);
    }

    submitArticle() {
        var article = {};
        article['title'] = this.state.title;
        article['category'] = this.state.selectCate;
        article['tags'] = this.state.selectTags;
        article['description'] = this.state.description;
        article['content'] = this.state.content;

        if (this.hasEmptyColumn(article)) {
            this.props.dispatch(showNotification('请将表单填写完整'));
        } else {
            article.category = article.category._id;
            var tags = [];
            for (var i = 0; i < article['tags'].length; i++) {
                tags.push(article['tags'][i]._id);
            }
            article.tags = tags;

            if (this.props.params.id) {
                this.props.editArticle(this.props.params.id,article);
            } else {
               this.props.addArticle(article);
            }
        }
    }

    hasEmptyColumn(data) {
        for(var key in data) {
            if(data[key]) {
                if(data[key].length<=0) {
                    return true;
                }
            }else {
                return true;
            }
        }
        return false;
    }
}


WriteArticle.propTypes = {
    articles: PropTypes.object.isRequired,
    category: PropTypes.array.isRequired,
    initCategory: PropTypes.func.isRequired,
    logged: PropTypes.bool.isRequired
};

export default connect(state => ({
    articles: state.articles.articles ? state.articles.articles : {},
    category: state.common.category ? state.common.category.dataList : [],
    tags: state.common.tags ? state.common.tags.dataList : [],
    logged: state.login.logged ? state.login.logged : false
}), dispatch => ({
    fetchArticleIfNeed: (id)=>dispatch(fetchArticleIfNeed(id)),
    initCategory: () => dispatch(fetchStaticDataIfNeed('category')),
    initTags: () => dispatch(fetchStaticDataIfNeed('tags')),
    editArticle:(id,set) => dispatch(showConfirm('修改文章', '是否确定修改文章', editOneThing.bind(this, 'article', id, set))),
    addArticle:(article) => dispatch(addOneThing('article',article))
}))(WriteArticle);
