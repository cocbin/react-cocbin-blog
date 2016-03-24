'use strict';

import React,{Component} from 'react';
import { Router, Route,IndexRoute ,browserHistory} from 'react-router';

import App from  './containers/App';
import Article from './containers/Article';
import ArticleDetail from './containers/ArticleDetail';
import Category from './containers/Category';
import CategoryDetail from "./containers/CategoryDetail";
import Tags from './containers/Tags';
import TagsDetail from './containers/TagsDetail';
import About from './containers/About';

class NoMatch extends Component {
    render() {
        return (
            <div>404</div>
        )
    }
}

module.exports = (
    <Router history={browserHistory} location="/">
        <Route path="/" component={App}>
            <Route path="/home" component={Article}/>
            <Route path="/article/:id" component={ArticleDetail}/>
            <Route path="/category" component={Category}>
                <Route path="/category/:id" component={CategoryDetail}/>
            </Route>
            <Route path="/about" component={About}/>
            <Route path="/tags" component={Tags}>
                <Route path="/tags/:id" component={TagsDetail}/>
            </Route>
            <Route path="/*" component={NoMatch}/>
        </Route>
    </Router>
);


//
//import Login from  '../Login';
//import AdminCate from '../AdminCate';
//import AdminTags from '../AdminTags';
//import AdminArticle from '../AdminArticle';
//import WriteArticle from '../WriteArticle';
//
//<Route path="/article/write" component={WriteArticle}/>
//<Route path="/article/edit/:id" component={WriteArticle}/>
//<Route path = "/login"  component = {Login}/>
//<Route path = "/admin/cate"  component = {AdminCate}/>
//<Route path = "/admin/tags"  component = {AdminTags}/>
//<Route path = "/admin/article"  component = {AdminArticle}/>