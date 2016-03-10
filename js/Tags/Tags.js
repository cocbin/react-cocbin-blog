'use strict';

import React, {Component} from 'react';
import {Link} from 'react-router';

import './Tags.less';

class Tags extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tags:[]
        }
    }

    componentDidMount() {
        fetch('./blogs/tags.json')
            .then(res=>res.json())
            .then(json =>{
                if(json.length>0) {
                    this.setState({
                        tags:json
                    });
                }
            });
    }

    render() {
        return (
            <div className = "animated bounceInRight">
                <ul className="tagList" style = {{width:this.props.routes.length==2?710:64}}>
                    {this.state.tags.map((tag,key)=>{
                        return this.renderTagsList(tag,key)
                    })}
                </ul>

                {this.props.children}

            </div>
        )
    }

    renderTagsList(tag,key){
        return (
            <li className = "tagCell" key = {key}>
                <Link to = {"tags/"+tag.id} activeStyle = {{"color":"#000"}} >
                    <i className = "tagIcon iconfont" dangerouslySetInnerHTML = {{__html:(tag.icon)}}/>
                    <span className = "tagContent">{tag.name}</span>
                </Link>
            </li>
        )
    }

}

module .exports = Tags;