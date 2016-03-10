'use strict';

import React,{Component} from 'react';
import {Link} from 'react-router';

import './ArticleRow.less';

class ArticleRow extends Component {

    render() {
        return (
            <Link to = {"/articles/"+this.props.article.id}>
                <div className = "clearfix articleRow">
                    <ArticleInfo date = {this.props.article.date} like = {this.props.article.like} look = {this.props.article.look} tags = {this.props.article.tags} />
                    <ArticleOutline title = {this.props.article.title} summary = {this.props.article.summary}/>
                </div>
            </Link>
        )
    }
}

class ArticleInfo extends Component {

    render () {
        var list = this.props.tags?this.props.tags.map((row,id)=>{
            return (
                <li key = {id}>
                    <ArticleInfoRow
                        icon = "&#xe602;"
                        content = {row.name}
                    />
                </li>
            );
        }):<li/>;

        return (

            <div className = "articleInfo">
                <ArticleInfoRow
                    icon = "&#xe600;"
                    content = {this.props.date}
                />
                <ArticleInfoRow
                    icon = "&#xe603;"
                    content = { this.props.like + " LIKE"}
                />
                <ArticleInfoRow
                    icon = "&#xe601;"
                    content = { this.props.look + " LOOK"}
                />

                <ul className = "articleTags">
                    {list}
                </ul>
            </div>
        )
    }
}

class ArticleOutline extends Component {
    render () {
        return (
            <div className = "articleOutline">
                <h2 className = "articleTitle">{this.props.title}</h2>
                <div className = "articleSummary">
                    {this.props.summary}
                </div>
            </div>
        )
    }
}

class ArticleInfoRow extends Component {
    render () {
        return (
            <div>
                <i className = "infoIcon iconfont">{this.props.icon}</i>
                <span className = "infoContent">{this.props.content}</span>
            </div>
        )
    }
}

module .exports = ArticleRow;