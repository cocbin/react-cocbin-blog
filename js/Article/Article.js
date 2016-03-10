`use strict`;

import React ,{Component} from 'react';
import ArticleRow from './ArticleRow';

import './Article.less';

class Article extends Component {

    constructor (props) {
        super(props);
        this.state = {
            articles:[]
        }
    }

    componentDidMount() {
        fetch("./blogs/blog_1.json")
            .then(res=>res.json())
            .then(json=>{
               this.setState({
                   articles:json
               });
            });
    }

    render() {
        if(this.props.params.id) {
            return (
                <div>
                    {this.props.children}
                </div>
            )
        } else {
            var articleList = this.state.articles?this.state.articles.map((row,id)=>{
                return  <ArticleRow article = {row} key = {id}/>
            }):<div/>;

            return(
                <div id = {this.props.id} className = "animated bounceInRight">
                    {this.props.children}
                    {articleList}
                </div>
            )
        }
    }
}

module .exports = Article;