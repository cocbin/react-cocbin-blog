'use strict';

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import ScrollBar from '../components/ScrollBar';
import Loadding from '../components/Loadding';

import {
    fetchStaticDataIfNeed,
    addOneThing,
    removeOneThing,
    editOneThing,
    showConfirm,
    showNotification
} from '../actions';

class AdminTags extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectTag:undefined,
            selectKey:undefined,
            nameValue:"",
            iconValue:"",
            descriptionValue:""
        };
    }

    componentDidMount() {
        this.props.initTags();
    }

    render() {
        if (!this.props.logged) {
            return <div>权限不足</div>
        }

        return (
            <div id = "categoryBox" className = "animated bounceInRight">
                <ScrollBar>
                    <ul className="cateList">
                        <li className = "cateCell" style = {{color:"#00b2cc"}} onClick = {this.handleCategoryClick.bind(this,undefined,undefined)}>
                            <i className = "cateIcon iconfont">&#xe668;</i>
                            <span className = "cateContent">添加</span>
                        </li>
                        {this.props.tags.map((cate, key)=> {
                            return this.renderCategoryList(cate,key)
                        })}
                    </ul>
                </ScrollBar>

                <div className="animated bounceInRight cateDetailBox">
                    <h3 className = "formTitle">{this.state.selectCate?"Edit":"Add"} a Tag</h3>
                    <div className = "inputBox">
                        <i className = "iconfont">&#xe669;</i>
                        <input type="text" name = "name" placeholder = "Category Name" value = {this.state.nameValue} onChange = {this.handleInputChange.bind(this,"nameValue")}/>
                    </div>
                    <div className = "inputBox">
                        <i className = "iconfont">&#xe66b;</i>
                        <input type="text" name = "icon" placeholder = "Category Icon" value = {this.state.iconValue} onChange = {this.handleInputChange.bind(this,"iconValue")}/>
                    </div>
                    <div className = "inputBox">
                        <i className = "iconfont">&#xe66c;</i>
                        <input type="text" name = "description" placeholder = "Description" value = {this.state.descriptionValue} onChange = {this.handleInputChange.bind(this,"descriptionValue")}/>
                    </div>
                    <div className="inputBtnGroup">
                    {
                        this.state.selectTag?
                            <input type="submit" onClick = {this.handleSubmit.bind(this)} value = "编辑" className="animated bounceIn btn"/>
                            :<button onClick = {this.handleSubmit.bind(this)} className = "animated bounceIn btn" >添加</button>
                    }
                    {
                        this.state.selectTag?
                            <button onClick={this.props.removeTags.bind(this,this.state.selectTag._id)}
                                    className="animated bounceIn btnDel">删除</button> : ""
                    }
                    </div>
                    {this.props.isFetching && Loadding}
                </div>
            </div>
        );
    }

    renderCategoryList(cate,key){
        return (
            <li className = {"cateCell " + (key==this.state.selectKey?"active":"")} key = {key} onClick = {this.handleCategoryClick.bind(this,cate,key)}>
                <i className = "cateIcon iconfont" dangerouslySetInnerHTML = {{__html:(cate.icon)}}/>
                <span className = "cateContent">{cate.name}</span>
            </li>
        )
    }

    handleSubmit() {
        var tag = {};
        tag['name'] = this.state.nameValue;
        tag['icon'] = this.state.iconValue;
        tag['description'] = this.state.descriptionValue;

        if (this.hasEmptyColumn(tag)) {
            this.props.dispatch(showNotification('请将表单填写完整'));
            return ;
        }

        if(this.state.selectTag) {
            this.props.editTags(this.state.selectTag._id, tag);
        } else {
            this.props.addTags(tag);
        }
    }

    hasEmptyColumn(data) {
        for(var key in data) {
            if(data[key]) {
                if(data[key].length<=0) {
                    return true;
                }
            }else {
                return true;
            }
        }
        return false;
    }

    handleCategoryClick(cate,selectKey) {
        this.setState({
            selectKey:selectKey,
            selectTag:cate,
            nameValue:cate&&cate.name,
            iconValue:cate&&cate.icon,
            descriptionValue:cate&&cate.description
        });
    }

    handleInputChange(name,e) {
        var setState = {};
        setState[name] = e.target.value;
        this.setState(setState);
    }
}

AdminTags.propTypes = {
    tags: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    initTags: PropTypes.func.isRequired,
    logged: PropTypes.bool.isRequired
};

export default connect(state => ({
    tags: state.common.tags ? state.common.tags.dataList : [],
    isFetching: state.common.tags ? state.common.tags.isFetching : false,
    logged: state.login.logged ? state.login.logged : false
}), dispatch => ({
    initTags: ()=>dispatch(fetchStaticDataIfNeed('tags')),
    editTags: (id, set) => {
        dispatch(showConfirm('修改标签', '是否确定修改标签', editOneThing.bind(this, 'tags', id, set)));
    },
    removeTags: (id) => {
        dispatch(showConfirm('删除标签', '是否确定删除标签', removeOneThing.bind(this, 'tags', id)));
    },
    addTags: (params) => {
        dispatch(addOneThing('tags', params));
    }
}))(AdminTags);


module .exports = AdminTags;