'use strict';

import React, {Component} from 'react';

import './Login.less';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isUserNameEmpty:false,
            isPasswordEmpty:false
        }
    }

    render() {
        return (
            <div className = "animated bounceInRight" id = "loginBox">
                <h3>Login</h3>
                <div className = "inputBox">
                    <i className = "iconfont">&#xe666;</i>
                    <input ref = "userName" type="text" name = "userName" placeholder = "UserName"/>
                    {this.state.isUserNameEmpty&&this.renderErrorTip("用户名不能为空")}
                </div>
                <div className = "inputBox">
                    <i className = "iconfont">&#xe667;</i>
                    <input ref = "password" type="password" name = "password" placeholder = "Password"/>
                    {this.state.isPasswordEmpty&&this.renderErrorTip("密码不能为空")}
                </div>
                <input type="submit" onClick = {this.handleSubmit.bind(this)}/>
            </div>
        )
    }

    handleSubmit() {
        let userName = this.refs.userName.getDOMNode().value;
        let password = this.refs.password.getDOMNode().value;
        if(userName == "") {
            this.setState({
                isUserNameEmpty:true
            });
            console.log("userName empty")
        } else {
            this.setState({
                isUserNameEmpty:false
            });
        }

        if(password == "") {
            this.setState({
                isPasswordEmpty:true
            });
        } else {
            this.setState({
                isPasswordEmpty:false
            });
        }
        console.log(`login -> userName = ${userName} password = ${password}`);
    }

    renderErrorTip (tip){
        return (
            <div className = "errorTip">
                <span className="tipContent">{tip}</span>
                <div className = "triangle"></div>
            </div>
        )
    }
}


module .exports = Login;