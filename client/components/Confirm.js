'use strict';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {hideConfirm, excuConfirmAction} from '../actions';
import './Confirm.less';

class Confirm extends Component {
    render(){
        return (
            <div id="confirm" style={{display:this.props.show?'block':'none'}}>
                <div id = "confirmInner">
                    <h3>{this.props.title}</h3>
                    <p>{this.props.content}</p>
                    <div className = "btnGroup">
                        <button className = "cancleBtn" onClick = {this.onBtnClick.bind(this,false)}>取消</button>
                        <button className = "okBtn" onClick = {this.onBtnClick.bind(this,true)}>确定</button>
                    </div>
                    <button className="closeBtn iconfont" onClick={this.props.hideConfirm}>&#xe60e;</button>
                </div>
            </div>
        )
    }

    onBtnClick(e){
        if (e) {
            this.props.excuConfirm();
        } else {
            this.props.hideConfirm();
        }
    }
}

Confirm.propTypes = {
    show: PropTypes.bool.isRequired,
    content: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    hideConfirm: PropTypes.func.isRequired,
    excuConfirm: PropTypes.func.isRequired
};
export default connect(state => ({
    show: state.confirm.show ? state.confirm.show : false,
    title: state.confirm.title ? state.confirm.title : "",
    content: state.confirm.content ? state.confirm.content : ""
}), (dispatch) => ({
    hideConfirm: () => dispatch(hideConfirm()),
    excuConfirm: () => dispatch(excuConfirmAction())
}))(Confirm);