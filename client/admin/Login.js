'use strict';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {login} from '../actions';
import Loadding from '../components/Loadding'

class Login extends Component {

    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(){
        if(this.props.logged) {
            this.props.pushToIndex();
            return false;
        }
        return true;
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
                {this.props.isFetching?Loadding:""}
            </div>
        )
    }

    handleSubmit() {
        let userName = this.refs.userName.value;
        let password = this.refs.password.value;
        this.props.login(userName,password);
    }
}

Login.propTypes = {
    logged:PropTypes.bool.isRequired,
    isFetching:PropTypes.bool.isRequired,
    login:PropTypes.func.isRequired,
    pushToIndex:PropTypes.func.isRequired
};

export default connect(state => ({
    logged:state.login.logged?state.login.logged:false,
    isFetching:state.login.isFetching?state.login.isFetching:false
}),dispatch => ({
    login:(userName,password)=>dispatch(login(userName,password)),
    pushToIndex:() => dispatch(push('/'))
}))(Login);