'use strict';

import React, {Component} from 'react';

import { Router, Route,IndexRoute ,hashHistory} from 'react-router';

import Menu from  '../Menu';
import Article from '../Article';
import ArticleDetail from '../ArticleDetail';
import Category from '../Category';
import CategoryDetail from "../CategoryDetail";
import Tags from '../Tags';
import TagsDetail from '../TagsDetail';
import About from '../About';

import Login from  '../Login';
import AdminCate from '../AdminCate';
import AdminTags from '../AdminTags';
import AdminArticle from '../AdminArticle';


import './App.less';
import './cssreset.css';
import './animatie.less';


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            logged:false
        }
    }


    componentDidMount() {
        //获取登录状态
        setTimeout(()=>{
            this.setState({
                logged:true
            });
        },1000);
        //服务器太慢了,5秒后验证额登录状态
    }

    render () {

        var menuWith = this.props.routes.length==1?"100%":240;

        return (
            <div id = "container">
                <Menu id="menuBox" width = {menuWith} logged = {this.state.logged}/>
                <div id="articleBox">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

class NoMatch extends Component {

    render() {
        return (
            <div>404</div>
        )
    }

}

class Routers extends Component {

    constructor(props) {
        super(props);

        this.state = {
            logged:true
        };
    }

    render () {
        return (
            <Router history = {hashHistory}>
                <Route path="/" component = {App}>
                    <Route path = "/home" component = {Article} />
                    <Route path="/articles" component = {Article}>
                        <Route path = ":id" component = {ArticleDetail}/>
                    </Route>
                    <Route path = "/category" component = {Category}>
                        <Route path = ":id" component = {CategoryDetail}/>
                    </Route>
                    <Route path = "/about" component = {About}/>
                    <Route path = "/tags" component = {Tags}>
                        <Route path = ":id" component = {TagsDetail}/>
                    </Route>
                    <Route path = "/login"  component = {Login}/>
                    <Route path = "/admin/cate"  component = {AdminCate}/>
                    <Route path = "/admin/tags"  component = {AdminTags}/>
                    <Route path = "/admin/article"  component = {AdminArticle}/>
                    <Route path="/*" component = {NoMatch}/>
                </Route>
            </Router>
        );
    }
}


React.render (
    <Routers/>,
    document.body
);

