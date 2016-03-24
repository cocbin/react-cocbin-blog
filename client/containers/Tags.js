'use strict';

import React, {Component} from 'react';
import {Link,browserHistory} from 'react-router';
import Notification from '../components/Notification';
import ScrollBar from '../components/ScrollBar';

import {GET,API} from '../tools/Fetch';

class Tags extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tags:[]
        }
    }

    componentDidMount() {
        GET(API.GET_TAGS,undefined,(err,dataList)=>{
            if(err) {
                Notification.notice({
                    content:"获取标签列表失败,Err:"+err
                });
            } else {
                this.setState({
                    tags:dataList
                });
                if(dataList.length>0) {
                    browserHistory.push('/tags/'+dataList[0]._id);
                }
            }
        });
    }

    render() {
        return (
            <div id = "categoryBox" className = "animated bounceInRight">
                <ScrollBar>
                    <ul className="cateList">
                        {this.state.tags.map((tag,key)=>{
                            return this.renderTagsList(tag,key)
                        })}
                    </ul>
                </ScrollBar>
                {this.props.children}
            </div>
        )
    }

    renderTagsList(tag,key){
        return (
            <li className = "cateCell" key = {key}>
                <Link to = {'/tags/'+tag._id} activeStyle = {{"color":"#000"}} >
                    <i className = "cateIcon iconfont" dangerouslySetInnerHTML = {{__html:(tag.icon)}}/>
                    <span className = "cateContent">{tag.name}</span>
                </Link>
            </li>
        )
    }

}

module .exports = Tags;