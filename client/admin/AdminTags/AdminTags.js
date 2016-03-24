'use strict';

import React, {Component} from 'react';

import ScrollBar from '../scrollBar';
import notification from '../notification';
import Confirm from '../confirm';
import {GET,POST,API} from '../Fetch';

class AdminTags extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tags:[],
            selectTag:undefined,
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
        GET(API.GET_TAGS,undefined, (err,docs) => {
            if(err) {
                console.log(err);
            } else {
                this.setState({
                    tags:docs
                });
            }
        })
    }

    render() {

        if(!API.LOGGED) {
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
                        {this.state.tags.map((cate,key)=>{
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
                            <button onClick = {this.removeTags.bind(this,this.state.selectTag._id)} className = "animated bounceIn btnDel">删除</button>:""
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

        var tag = {};
        tag['name'] = this.state.nameValue;
        tag['icon'] = this.state.iconValue;
        tag['description'] = this.state.descriptionValue;

        if(this.state.selectTag) {
            //修改category
            Confirm.show({
                title:"修改标签",
                content:"是否修改标签",
                callback:(result)=>{
                    if(result) {
                        if(this.hasEmptyColumn(tag)) {
                            notification.notice({
                                content:"请将表单填写完整"
                            });
                        }else{
                            POST(API.UPDATE_TAGS,{id:this.state.selectTag._id,set:tag},(err,doc) => {
                                if(err) {
                                    notification.notice({
                                        content:"修改标签失败,Err:"+err
                                    });
                                } else {
                                    notification.notice({
                                        content:"修改标签成功!"
                                    });
                                    var newTags = this.state.tags;
                                    newTags[this.state.selectKey] = tag;
                                    this.setState({
                                        tags:newTags
                                    });
                                }
                            });
                        }
                    }
                }
            });
        } else {
            //添加category

            if(this.hasEmptyColumn(tag)) {
                notification.notice({
                    content:"请将表单填写完整"
                });
            }else{
                POST(API.PUT_TAGS,tag,(err,doc) => {
                    if(err) {
                        notification.notice({
                            content:"添加标签失败,Err:"+err
                        });
                    } else {
                        notification.notice({
                            content:"添加标签成功!"
                        });
                        var newTags = this.state.tags;
                        newTags.push(doc);
                        this.setState({
                            tags:newTags,
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

    removeTags(id) {

        Confirm.show({
            title:"删除标签",
            content:"是否确定删除选中的标签",
            callback:(result)=>{
                if(result) {
                    POST(API.REMOVE_TAGS,{id:id},(err) => {
                        if(err) {
                            notification.notice({
                                content:"删除标签失败,Err:"+err
                            });
                        } else {
                            var newTags = this.state.tags;
                            for(var i = 0;i<newTags.length;i++) {
                                if(newTags[i]._id==id){
                                    newTags.splice(i,1);
                                    break;
                                }
                            }
                            this.setState({
                                tags:newTags
                            });
                            notification.notice({
                                content:"删除标签成功!"
                            });
                        }
                    })
                }
            }
        });
    }
}


module .exports = AdminTags;