'use strict';

import React,{Component} from 'react';
import marked from 'marked';

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
        var highlightCode = hljs.highlightAuto(code,["javascript","html","shell"]);
        return highlightCode.value;
    }
});

class ArticleDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            article:""
        }
    }

    componentDidMount(){
        this.refresh(this.props.params.id);
    }

    componentWillUpdate(nextProps){
        if(nextProps.params.id != this.props.params.id) {
            this.refresh(nextProps.params.id);
        }
    }

    refresh(id){
        fetch('./blogs/blog_1.json')
            .then(res=>res.json())
            .then(json=>{
                console.log("加载数据中...");
                var articles = json.filter(one=>{
                    return one.id==id
                });
                if(articles&&articles.length==1) {

                    fetch('./blogs/' + articles[0].path)
                        .then(res=>res.text())
                        .then(text=> {
                            this.setState({
                                article:text
                            });
                            console.log("数据加载完成");
                        });
                }
            });
    }

    render() {
        return (
            <div className = "markdown-body animated bounceInRight">
                <div dangerouslySetInnerHTML = {{__html:(marked(this.state.article))}}/>
            </div>
        );
    }
}

module .exports = ArticleDetail;