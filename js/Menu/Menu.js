'use strict';

import React ,{Component} from 'react';
import {Link} from 'react-router';
import './Menu.less';

const imageAvatar = require('./images/avatar.png');
const imageLogo = require('./images/logo.png');

import MenuItems from './MenuItems';

class Menu extends Component {


    constructor(props) {

        super(props);
        this.state = {
            authorInfoHeight:145,
            avatarWidth:105,
            avatarHeight:105,
            avatarLeft:67,
            logoLeft:53,
            logoHeight:30,
            logoBottom:0
        };

        this.defaule = {
            authorInfoHeight:145,
            avatarWidth:105,
            avatarHeight:105,
            avatarLeft:67,
            logoLeft:53,
            logoHeight:30,
            logoBottom:0
        };
    }

    componentDidMount () {
        //菜单出现动画
        let menu = this.refs.menu.getDOMNode();
        let lis = menu.getElementsByClassName('menuItems');
        for (let i = 0;i<lis.length;i++) {
            setTimeout(()=>{
                addClass(lis[i],"bounceInRight");
            },50*i);
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.logged != this.props.logged) {

            //菜单出现动画
            let menu = this.refs.adminMenu.getDOMNode();
            let lis = menu.getElementsByClassName('menuItems');
            for (let i = 0;i<lis.length;i++) {
                setTimeout(()=>{
                    addClass(lis[i],"bounceInRight");
                },50*i);
            }
        }
    }

    render() {
        return (
            <div ref = "menu" id = {this.props.id} style = {{width:this.props.width}}>
                <div id = "authorInfo" style = {{height:this.state.authorInfoHeight}}>
                    <Link to = "/">
                        <img id = "avatar"
                             src={imageAvatar}
                             alt="user avatar"
                             className = "animated bounceIn"
                        />
                    </Link>
                    <Link to = "/login">
                        <img id = "logo" src={imageLogo}
                             alt="user logo"
                             className = "animated bounceIn"
                             />
                    </Link>
                </div>
                <MenuItems
                    title = "Home"
                    link = "/home"
                />
                <MenuItems
                    title = "Category"
                    link = "/category/0"
                />
                <MenuItems
                    title = "Tags"
                    link = "/tags"
                />
                <MenuItems
                    title = "About"
                    link = "/about"
                />
                {
                    this.props.logged?this.renderAdminMenu():""
                }
            </div>
        );
    }

    renderAdminMenu() {
        return (
            <div ref = "adminMenu">
                <MenuItems
                    title = "CategoryAdmin"
                    link = "/admin/cate"
                />
                <MenuItems
                    title = "TagsAdmin"
                    link = "/admin/tags"
                />
                <MenuItems
                    title = "ArticleAdmin"
                    link = "/admin/article"
                />
            </div>
        );
    }

}


function hasClass(obj, cls) {
    return obj.className?obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)')):false;
}

function addClass(obj, cls) {
    if (!hasClass(obj, cls)) obj.className =  obj.className+" " + cls;
}

function removeClass(obj, cls) {
    if (hasClass(obj, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        obj.className = obj.className.replace(reg, ' ');
    }
}


module .exports = Menu;