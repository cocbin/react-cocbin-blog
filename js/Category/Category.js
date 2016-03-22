'use strict';

import React, {Component} from 'react';
import {Link,browserHistory} from 'react-router';

import {GET,API} from '../Fetch';
import ScrollBar from '../ScrollBar';
import notification from '../Notification';


import './Category.less';


class Category extends Component {

    constructor(props) {
        super(props);
        this.state = {
            category:[]
        }
    }

    componentDidMount() {
        GET(API.GET_CATEGORY,undefined,(err,docs) => {
            if(err) {
                notification.notice({
                    content:"获取标签列表失败,Err:"+err
                });
            } else {
                this.setState({
                    category:docs
                });
                if(docs.length>0) {
                    browserHistory.push('/category/'+docs[0]._id);
                }
            }
        });
    }


    render() {
        return (
            <div id = "categoryBox" className = "animated bounceInRight">
                <ScrollBar>
                    <ul className="cateList">
                        {this.state.category.map((cate,key)=>{
                            return this.renderCategoryList(cate,key)
                        })}
                    </ul>
                    <div className="clearfix"></div>
                </ScrollBar>

                {this.props.children}

            </div>
        )
    }

    renderCategoryList(cate,key){
        return (
            <li className = "cateCell" key = {key}>
                <Link to = {"/category/"+cate._id} activeStyle = {{"color":"#000"}} >
                    <i className = "cateIcon iconfont" dangerouslySetInnerHTML = {{__html:(cate.icon)}}/>
                    <span className = "cateContent">{cate.name}</span>
                </Link>
            </li>
        )
    }

}

module .exports = Category;