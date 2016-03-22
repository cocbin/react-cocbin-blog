'use strict';

import React,{Component} from 'react';
import {Link} from 'react-router';
import Date from '../Date';

import './ArticleRow.less';

class ArticleRow extends Component {

    render() {

        var article = this.props.article;
        var date = new Date(article.date);
        return (
            <Link className = "link" to = {"/article/" + article.id}>
                <div className = "articleRow row articleInner">
                    <div className="articleDate">
                        <div>
                            <div className = "left">
                                <div className = "dateDay">{date.getDate()}</div>
                                <div className = "dateMoonth">{date.pattern("MM")}</div>
                            </div>
                        </div>
                        <div className = "left dateYear">{date.getFullYear()}</div>
                    </div>
                    <div className = "articleSummury">
                        <div  className = "articleSummuryInner">
                            <h2 className = "articleTitle" style = {{textAlign:'left'}}>
                                <span className = "articleCategory" style = {{fontSize:12,marginRight:10,verticalAlign: 'middle',borderRadius:4,backgroundColor:"rgb(240,160,200)"}}>{article.category.name}</span>
                                {article.title}
                            </h2>

                            <p className = "articleDescription">
                                {article.description}
                            </p>
                            <div className = "btn" style = {{width:79,height:25,float:'right',textAlign: 'center',lineHeight:'25px',fontSize:'14px'}}>阅读全文</div>
                            <div className = "clearfix"></div>
                            <div className = "articleTagsRow">
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
                                {
                                    article.tags?article.tags.map((row,id)=>{
                                        return (
                                                <ArticleInfoRow
                                                    key = {id}
                                                    icon = "&#xe602;"
                                                    content = {row.name}
                                                />
                                        );
                                    }):<li/>
                                }
                            </div>

                            <div className="clearfix"></div>
                        </div>
                    </div>
                </div>
            </Link>
        )
    }
}

class ArticleInfoRow extends Component {
    render () {
        return (
            <div className = "left articleTags">
                <i className = "iconfont">{this.props.icon}</i>
                <span>{this.props.content}</span>
            </div>
        )
    }
}

module .exports = ArticleRow;