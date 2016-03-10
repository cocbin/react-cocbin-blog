'use strict';

import React ,{Component} from 'react';
import {Link} from 'react-router';

import {addClass,removeClass,hasClass} from '../DomOperation';

class CategoryDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id:0,
            articles:[]
        }
    }

    componentWillUpdate(nextProps){
        if(nextProps.params.id != this.props.params.id) {
            this.refresh(nextProps.params.id);
        }
    }

    componentDidMount() {
        this.refresh(this.props.params.id);
    }

    refresh(id){
        //刷新类别  搜索内容
        //通过tagid搜索
        fetch("./blogs/blog_1.json")
        .then(res=>res.json())
        .then(json=>{
            this.setState({
                articles:json
            });
        });

        //刷新动画
        var box = this.refs.cateDetailBox.getDOMNode();
        if(box) {
            removeClass(box,"bounceInRight");

            setTimeout(()=>{

                //find category by id

                addClass(box,"bounceInRight");
                this.setState({
                    id:id
                });
            },100);
        }
    }

    render() {

        return (
            <div ref = "cateDetailBox" className = "cateDetailBox animated">
                category detail {this.state.id}
                <ul>
                    {this.state.articles.map((row,key) =>this.renderArticleList(row,key))}
                </ul>
            </div>
        );
    }

    renderArticleList(row,key) {
        return (
            <li key = {key} className = "articleListBox clearfix">
                <Link to = {"/articles/"+row.id}>
                    <h2>{row.title}</h2>
                    <ul className = "clearfix">
                        {this.renderArticleTag("&#xe600;",row.date)}
                        {this.renderArticleTag("&#xe603;",row.like)}
                        {this.renderArticleTag("&#xe601;",row.look)}
                    </ul>
                    <p style = {{marginTop:15}}>
                        {row.summary}
                    </p>
                    <ul className = "clearfix" style = {{float:"right"}}>
                        {row.tags.map((tag,key)=>
                            this.renderArticleTag("&#xe602;",tag.name,key)
                        )}
                    </ul>
                </Link>
            </li>
        );
    }

    renderArticleTag(icon,name,key) {
        return (
            <li className="articleTagsBox" key = {key}>
                <i className = "articleTagIcon iconfont" dangerouslySetInnerHTML = {{__html:icon}}/>
                <span className = "infoContent">{name}</span>
            </li>
        );
    }

}

module.exports = CategoryDetail;
