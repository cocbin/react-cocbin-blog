'use strict';

import React, {Component} from 'react';

import { Router, Route,IndexRoute ,browserHistory} from 'react-router';
import { API,POST} from '../Fetch';

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
import WriteArticle from '../WriteArticle';

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

        POST(API.ADMIN_CHECKLOGIN,undefined,(err) =>{
           if(err==undefined) {
               API.LOGGED = true;
               this.setState({
                   logged:true
               });
           }
        });
    }

    componentWillUpdate(nextProps){
        if(nextProps.location.state&&nextProps.location.state.logged != this.state.logged) {
            this.setState({
                logged:nextProps.location.state.logged
            })
        }
    }

    render () {
        var menuWith = this.props.routes.length==1?"100%":240;

        return (
            <div id = "container">
                <Menu id="menuBox" width = {menuWith} logged = {this.state.logged}/>
                <div id="articleBox">
                    {this.props.children}
                </div>
                <div id = "notificationBox"></div>
                <div id = "confirmBox"></div>
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
            <Router history = {browserHistory}>
                <Route path="/" component = {App}>
                    <Route path="/home" component = {Article}/>
                    <Route path = "/article/write" component = {WriteArticle}/>
                    <Route path = "/article/edit/:id" component = {WriteArticle}/>
                    <Route path = "/article/:id" component = {ArticleDetail}/>
                    <Route path = "/category" component = {Category}>
                        <Route path = "/category/:id" component = {CategoryDetail}/>
                    </Route>
                    <Route path = "/about" component = {About}/>
                    <Route path = "/tags" component = {Tags}>
                        <Route path = "/tags/:id" component = {TagsDetail}/>
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

