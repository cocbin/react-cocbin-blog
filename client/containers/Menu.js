'use strict';

import React ,{Component} from 'react';
import {Link,browserHistory} from 'react-router';
import './Menu.less';

const imageAvatar = require('./images/avatar.png');
const imageLogo = require('./images/logo.png');
import {addClass,removeClass,hasClass} from '../tools/DomOperation';
import MenuItems from '../components/MenuItems';
import {POST,API} from '../tools/Fetch';
import Notification from '../components/Notification';
import Confirm from '../components/Confirm';


class Menu extends Component {


    constructor(props) {

        super(props);
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

    render() {
        return (
            <div ref = "menu" id = {this.props.id} style = {{width:this.props.width}}>
                <div id = "authorInfo">
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
                {
                    this.props.logged?this.renderAdminMenu():""
                }
                <MenuItems
                    title = "Home"
                    link = "/home"
                />
                <MenuItems
                    title = "Category"
                    link = "/category"
                />
                <MenuItems
                    title = "Tags"
                    link = "/tags"
                />
                <MenuItems
                    title = "About"
                    link = "/about"
                />

            </div>
        );
    }

    renderAdminMenu() {
        return (
            <div className = "adminButton">
                {this.renderIconButton('/admin/cate','&#xe669;')}
                {this.renderIconButton('/admin/tags','&#xe66e;')}
                {this.renderIconButton('/admin/article','&#xe66c;')}
                {this.renderIconButton('/article/write','&#xe64e;')}
                <a href = "javascript:void(0);" onClick = {this.logout}><i className = "iconfont">&#xe66f;</i></a>
            </div>
        );
    }

    renderIconButton(link,icon) {
        return (
            <Link to = {link} activeStyle = {{color:'rgb(120, 192, 252)'}}>
                <i className = "iconfont" dangerouslySetInnerHTML = {{__html:icon}}/>
            </Link>
        )
    }

    logout() {
        Confirm.show({
            title:"退出登录",
            content:"是否确定退出登录",
            callback:(result)=> {
                if(result)
                POST(API.ADMIN_LOGOUT, undefined, (err) => {
                    if (err == undefined) {
                        Notification.notice({
                            content: '退出登录成功'
                        });
                        API.LOGGED = false;
                        browserHistory.push({pathname:'/',state:{logged:false}});
                    } else {
                        Notification.notice({
                            content: '退出登录失败,ERR:' + err
                        });
                    }
                })
            }
        })
    }
}

module .exports = Menu;