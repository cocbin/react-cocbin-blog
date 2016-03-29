'use strict';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import './Notification.less';

class Notification extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div className = "notification animated bounceIn"
             style = {{top:this.props.show?0:-42}}>
            {this.props.content}
        </div>
        );
    }
}

Notification.propTypes = {
    show: PropTypes.bool.isRequired,
    content: PropTypes.string.isRequired
};

export default connect(state => ({
    show:state.notification.show?state.notification.show:false,
    content:state.notification.content?state.notification.content:""
}))(Notification);