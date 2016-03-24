'use strict';

import React, {Component} from 'react';
import {POST,API} from '../tools/Fetch';
import notification from '../notification';
import {browserHistory} from 'react-router';

class Login extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className = "animated bounceInRight" >
                <h3 className = "formTitle">Login</h3>

                <div className = "inputBox">
                    <i className = "iconfont">&#xe666;</i>
                    <input ref = "userName" type="text" name = "userName" placeholder = "UserName"/>
                </div>

                <div className = "inputBox">
                    <i className = "iconfont">&#xe667;</i>
                    <input ref = "password" type="password" name = "password" placeholder = "Password"/>
                </div>
                <div style = {{textAlign:'center'}}>
                    <input type="submit" className = "btn" onClick = {this.handleSubmit.bind(this)} />
                </div>
            </div>
        )
    }

    handleSubmit() {
        let userName = this.refs.userName.getDOMNode().value;
        let password = this.refs.password.getDOMNode().value;

        if(userName == "") {
            notification.notice({
                content:"用户名不能为空!"
            });
            return ;
        }

        if(password == "") {
            notification.notice({
                content:"密码不能为空!"
            });
            return ;
        }

        console.log(`login -> userName = ${userName} password = ${password}`);
        POST(API.ADMIN_LOGIN,{userName:userName,password:password},(err,date) => {
            if(err) {
                notification.notice({
                    content:'登录失败,ERR:'+err
                });
            } else {
                console.log("登录成功");
                API.LOGGED = true;
                browserHistory.push({pathname:'/',state:{logged:true}});
            }
        })
    }
}


module .exports = Login;