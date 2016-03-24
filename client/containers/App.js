'use strict';

import React, {Component} from 'react';
import { API,POST} from '../tools/Fetch';

import Menu from  './Menu';

import './App.less';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            logged: false
        }
    }

    componentDidMount() {
        //获取登录状态
        console.log(this.props.location);
        console.log(this.props.routes);
        POST(API.ADMIN_CHECKLOGIN, undefined, (err) => {
            if (err == undefined) {
                API.LOGGED = true;
                this.setState({
                    logged: true
                });
            }
        });
    }

    componentWillUpdate(nextProps) {
        if (nextProps.location.state && nextProps.location.state.logged != this.state.logged) {
            this.setState({
                logged: nextProps.location.state.logged
            })
        }
    }

    render() {
        if (typeof window !== "undefined") {
            var menuWith = this.props.routes.length == 1 ? "100%" : 240;
        } else {
            var menuWith = this.props.routes.length == 2 ? "100%" : 240;
        }

        return (
            <div id="container">
                <Menu id="menuBox" width={menuWith} logged={this.state.logged}/>
                <div id="articleBox">
                    {this.props.children}
                </div>
                <div id="notificationBox"></div>
                <div id="confirmBox"></div>
            </div>
        );
    }
}

export default App;