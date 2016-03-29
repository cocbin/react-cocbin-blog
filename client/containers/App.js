'use strict';

import React, {Component,PropTypes} from 'react';
import {connect} from 'react-redux';

import Notification from '../components/Notification';
import Confirm from '../components/Confirm';
import Menu from  './Menu';
import {checkLogin} from '../actions';

import './App.less';

class App extends Component {

    constructor(props) {
        super(props);
        this.props.checkLogin();
    }

    render() {
        var menuWidth;
        if (typeof window !== "undefined") {
            menuWidth = this.props.routes.length == 1 ? "100%" : 240;
        } else {
            menuWidth = this.props.routes.length == 2 ? "100%" : 240;
        }

        return (
            <div id="container">
                <Menu id="menuBox" width={menuWidth}/>
                <div id="articleBox">
                    {this.props.children}
                </div>
                <Notification/>
                <Confirm/>
            </div>
        );
    }
}

App.propTypes = {
    checkLogin:PropTypes.func.isRequired
};

export default connect(undefined,(dispatch) =>({
    checkLogin:() => dispatch(checkLogin())
}))(App);