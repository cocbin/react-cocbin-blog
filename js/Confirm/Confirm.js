'use strict';
import React,{Component} from 'react';
import './Confirm.less';

class Confirm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title:props.title,
            content:props.content,
            callback:props.callback,
            show:true
        };

    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            title:nextProps.title,
            content:nextProps.content,
            callback:nextProps.callback,
            show:true
        });

    }

    render(){
        return (
            <div id = "confirm" style = {{display:this.state.show?'block':'none'}}>
                <div id = "confirmInner">
                    <h3>{this.state.title}</h3>
                    <p>{this.state.content}</p>
                    <div className = "btnGroup">
                        <button className = "cancleBtn" onClick = {this.onBtnClick.bind(this,false)}>取消</button>
                        <button className = "okBtn" onClick = {this.onBtnClick.bind(this,true)}>确定</button>
                    </div>
                    <button className = "closeBtn iconfont" onClick = {()=>this.setState({show:false})}>&#xe60e;</button>
                </div>
            </div>
        )
    }

    onBtnClick(e){

        this.setState({
            show:false
        });

        if(this.state.callback) {
            this.state.callback(e);
        }
    }
}


Confirm.newInstance = function newConfirmInstance() {

    /**
     *  props
     *  - title     标题
     *  - content   内容
     *  - callback  回调函数
     */

    return {
        show: function(props) {
            React.render(<Confirm {...props}/>, document.getElementById('confirmBox'));
        }
    };
};

module.exports = Confirm.newInstance();