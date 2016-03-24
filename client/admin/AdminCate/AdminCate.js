'use strict';

import React, {Component} from 'react';

import {GET,POST,API} from '../Fetch';
import ScrollBar from '../scrollBar';
import notification from '../notification';
import Confirm from '../confirm';

import {Link} from 'react-router';


import './AdminCate.less';

class AdminCate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            category:[],
            selectCate:undefined,
            selectKey:undefined,
            nameValue:"",
            iconValue:"",
            descriptionValue:""
        }
    }

    componentDidMount() {
        if(!API.LOGGED) {
            return ;
        }
        this.refreshData();
    }

    refreshData() {

        GET(API.GET_CATEGORY,undefined,(err,dataList)=>{
            if(err) {
                console.log(err);
            } else {
                this.setState({
                    category:dataList
                });
            }
        });
    }

    render() {

        if(!API.LOGGED) {
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
                    {this.state.category.map((cate,key)=>{
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
                            <button onClick = {this.removeCate.bind(this,this.state.selectCate._id)} className = "animated bounceIn btnDel">删除</button>:""
                    }
                    </div>
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

        if(this.state.selectCate) {
            //修改category
            Confirm.show({
                title:"修改类别",
                content:"是否修改类别",
                callback:(result)=>{
                    if(result) {
                        if(this.hasEmptyColumn(category)) {
                            notification.notice({
                                content:"请将表单填写完整"
                            });
                        }else{
                            POST(API.UPDATE_CATEGORY,{id:this.state.selectCate._id,set:category},(err) => {
                                if(err) {
                                    notification.notice({
                                        content:"修改类别失败,Err:"+err
                                    });
                                } else {
                                    notification.notice({
                                        content:"修改类别成功!"
                                    });
                                    var newCategory = this.state.category;
                                    newCategory[this.state.selectKey] = category;
                                    this.setState({
                                        category:newCategory
                                    });
                                }
                            });
                        }
                    }
                }
            });
        } else {
            //添加category

            if(this.hasEmptyColumn(category)) {
                notification.notice({
                    content:"请将表单填写完整"
                });
            }else{
                POST(API.PUT_CATEGORY,category,(err,doc) => {
                    if(err) {
                        notification.notice({
                            content:"添加类别失败,Err:"+err
                        });
                    } else {
                        notification.notice({
                            content:"添加类别成功!"
                        });
                        var newCategory = this.state.category;
                        newCategory.push(doc);
                        this.setState({
                            category:newCategory,
                            nameValue:"",
                            iconValue:"",
                            descriptionValue:""
                        });
                    }
                });
            }
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

    removeCate(id) {

        Confirm.show({
            title:"删除类别",
            content:"是否确定删除选中的类别",
            callback:(result)=>{
                if(result) {
                    POST(API.REMOVE_CATEGORY,{id:id},(err) => {
                        if(err) {
                            notification.notice({
                                content:"删除类别失败,Err:"+err
                            });
                        } else {
                            var newCategory = this.state.category;
                            for(var i = 0;i<newCategory.length;i++) {
                                if(newCategory[i]._id==id){
                                    newCategory.splice(i,1);
                                    break;
                                }
                            }
                            this.setState({
                                category:newCategory
                            });
                            notification.notice({
                                content:"删除类别成功!"
                            });
                        }
                    })
                }
            }
        });
    }
}


module.exports = AdminCate;