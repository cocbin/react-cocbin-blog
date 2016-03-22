'use strict';
import React, {Component} from 'react';
import './Notification.less';

class Notification extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content:props.content,
            marginTop:0
        };

        this.timeoutId = setTimeout(()=>{
            this.setState({
               marginTop:-42
            })
        },5000);
    }

    componentWillReceiveProps(nextProps) {
        clearTimeout(this.timeoutId);

        this.setState({
            content:nextProps.content,
            marginTop:0
        });

        this.timeoutId = setTimeout(()=>{
            this.setState({
                marginTop:-42
            })
        },5000);
    }

    render() {
        return (
        <div className = "notification animated bounceIn"
                    style = {
                    {marginTop:this.state.marginTop}
                    }>
            {this.state.content}
        </div>
        );
    }
}

Notification.newInstance = function newNotificationInstance() {

    return {
        notice: function notice(noticeProps) {
            React.render(<Notification {...noticeProps}/>, document.getElementById('notificationBox'));
        }
    };
};

var notification = Notification.newInstance();

module.exports = notification;