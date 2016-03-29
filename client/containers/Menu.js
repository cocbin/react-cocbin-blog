'use strict';

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import {addClass} from '../tools/DomOperation';
import MenuItems from '../components/MenuItems';
import {logout,showConfirm} from '../actions';

const imageAvatar = require('./images/avatar.png');
const imageLogo = require('./images/logo.png');
import './Menu.less';


class Menu extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount () {
        //菜单出现动画
        let menu = this.refs.menu;
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
                    <Link to={this.props.logged?'/':'/login'}>
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
                {Menu.renderIconButton('/admin/cate','&#xe669;')}
                {Menu.renderIconButton('/admin/tags','&#xe66e;')}
                {Menu.renderIconButton('/admin/article','&#xe66c;')}
                {Menu.renderIconButton('/article/write','&#xe64e;')}
                <a href = "javascript:void(0);" onClick = {this.props.logout}><i className = "iconfont">&#xe66f;</i></a>
            </div>
        );
    }

    static renderIconButton(link, icon) {
        return (
            <Link to = {link} activeStyle = {{color:'rgb(120, 192, 252)'}}>
                <i className = "iconfont" dangerouslySetInnerHTML = {{__html:icon}}/>
            </Link>
        )
    }
}

Menu.propTypes = {
    logged: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
};

export default connect(state => ({
    logged: state.login.logged ? state.login.logged : false
}),(dispatch => ({
    logout:() => dispatch(showConfirm('退出登录','是否确定退出登录',logout))
})))(Menu);