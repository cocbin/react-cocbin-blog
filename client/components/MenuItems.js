'use strict';

import React, {Component} from 'react';
import {Link} from 'react-router';

import './MenuItems.less'

/**
 * title : {title:"title"}
 * dataSource : [{name,route}]
 */


class MenuItems extends Component {

    render(){
        return (
            <div className="menuItems animated">
                <span className = "menuItemsTitle">
                    <Link to = {this.props.link||"/"} activeStyle = {{color:"#78C0FC"}}>
                        {this.props.title}
                    </Link>
                </span>
            </div>
        );
    }
}


module .exports = MenuItems;


//
//class MenuItems extends Component {
//
//    render(){
//
//        const list = this.props.dataSource?this.props.dataSource.map((row,i)=>{
//            return (
//                <li key = {i} className = "menuItemsRows">
//                    <Link to = {"/articles/"+row.id}>{row.name}</Link>
//                </li>
//            );
//        }):<li/>;
//
//        return (
//            <div className="menuItems">
//                <span className = "menuItemsTitle" onClick = {this.onMenuClick.bind(this)}>{this.props.title}</span>
//                <ul>
//                    {list}
//                </ul>
//            </div>
//        );
//    }
//
//    onMenuClick (e) {
//        console.log();
//        var ul =e.target.parentNode.getElementsByTagName('ul')[0];
//        var lis = ul.getElementsByTagName('li');
//        if(hasClass(ul,"active")) {
//            removeClass(ul,"active");
//            for(let i = 0;i<lis.length;i++) {
//                setTimeout(()=>{
//                    removeClass(lis[i], "active");
//                },50*i);
//            }
//        } else {
//            addClass(ul,"active");
//            for(let i = 0;i<lis.length;i++) {
//                setTimeout(()=>{
//                    addClass(lis[i] , "active");
//                },50*i);
//            }
//        }
//    }
//}
