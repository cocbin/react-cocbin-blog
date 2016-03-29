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

import './AdminCate.less';

class AdminCate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectCate:undefined,
            selectKey:undefined,
            nameValue:"",
            iconValue:"",
            descriptionValue:""
        };
    }

    componentDidMount() {
        this.props.initCategory();
    }

    render() {
        if (!this.props.logged) {
            return <div>权限不足</div>
        }
        return (
            <div id = "categoryBox" className = "animated bounceInRight">
                <ScrollBar>
                <ul className="cateList">
                    <li className = "cateCell" style = {{color:"#00b2cc"}} onClick = {this.handleCategoryClick.bind(this,undefined)}>
                        <i className = "cateIcon iconfont">&#xe668;</i>
                        <span className = "cateContent">添加</span>
                    </li>
                    {this.props.category.map((cate, key)=> {
                        return this.renderCategoryList(cate,key)
                    })}
                </ul>
                </ScrollBar>

                <div className="animated bounceInRight cateDetailBox">
                    <h3 className = "formTitle">{this.state.selectCate?"Edit":"Add"} a Category</h3>
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
                        this.state.selectCate?
                            <input type="submit" onClick = {this.handleSubmit.bind(this)} value = "编辑" className="animated bounceIn btn"/>
                            :<button onClick = {this.handleSubmit.bind(this)} className = "animated bounceIn btn" >添加</button>
                    }
                    {
                        this.state.selectCate?
                            <button onClick={this.props.removeCategory.bind(this,this.state.selectCate._id)}
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

        var category = {};
        category['name'] = this.state.nameValue;
        category['icon'] = this.state.iconValue;
        category['description'] = this.state.descriptionValue;

        if (this.hasEmptyColumn(category)) {
            this.props.dispatch(showNotification('请将表单填写完整'));
            return;
        }

        if(this.state.selectCate) {
            this.props.editCategory(this.state.selectCate._id, category);
        } else {
            this.props.addCategory(category);
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
            selectCate:cate,
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


AdminCate.propTypes = {
    category: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    initCategory: PropTypes.func.isRequired,
    logged: PropTypes.bool.isRequired
};

export default connect(state => ({
    category: state.common.category ? state.common.category.dataList : [],
    isFetching: state.common.category ? state.common.category.isFetching : false,
    logged: state.login.logged ? state.login.logged : false
}), dispatch => ({
    initCategory: () => dispatch(fetchStaticDataIfNeed('category')),
    editCategory: (id, set) => {
        dispatch(showConfirm('修改类别', '是否确定修改类别', editOneThing.bind(this, 'category', id, set)));
    },
    removeCategory: (id) => {
        dispatch(showConfirm('删除类别', '是否确定删除类别', removeOneThing.bind(this, 'category', id)));
    },
    addCategory: (params) => {
        dispatch(addOneThing('category', params));
    }
}))(AdminCate);