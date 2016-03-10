'use strict';

import React, {Component} from 'react';
import {Link} from 'react-router';

import './Category.less';


class Category extends Component {

    constructor(props) {
        super(props);
        this.state = {
            category:[]
        }
    }

    componentDidMount() {
        fetch('./blogs/category.json')
            .then(res=>res.json())
            .then(json =>{
                if(json.length>0) {
                    this.setState({
                        category:json
                    });
                }
            });
    }


    render() {
        return (
            <div className = "animated bounceInRight">
                <ul className="cateList">
                    {this.state.category.map((cate,key)=>{
                        return this.renderCategoryList(cate,key)
                    })}
                </ul>

                {this.props.children}

            </div>
        )
    }

    renderCategoryList(cate,key){
        return (
            <li className = "cateCell" key = {key}>
                <Link to = {"category/"+cate._id} activeStyle = {{"color":"#000"}} >
                    <i className = "cateIcon iconfont" dangerouslySetInnerHTML = {{__html:(cate.icon)}}/>
                    <span className = "cateContent">{cate.name}</span>
                </Link>
            </li>
        )
    }

}

module .exports = Category;