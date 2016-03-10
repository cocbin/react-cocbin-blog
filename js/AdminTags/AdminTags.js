'use strict';

import React, {Component} from 'react';

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
        fetch('./blogs/tags.json')
            .then(res=>res.json())
            .then(json =>{
                if(json.length>0) {
                    this.setState({
                        tags:json
                    });
                }
            });
    }

    render() {
        return (
            <div className = "animated bounceInRight">
                <ul className="cateList">
                    <li className = "cateCell" style = {{color:"#00b2cc"}} onClick = {this.handleCategoryClick.bind(this,undefined,undefined)}>
                        <i className = "cateIcon iconfont">&#xe668;</i>
                        <span className = "cateContent">添加</span>
                    </li>
                    {this.state.tags.map((cate,key)=>{
                        return this.renderCategoryList(cate,key)
                    })}
                </ul>

                <div className="animated bounceInRight editBox">
                    <h3>{this.state.selectCate?"Edit":"Add"} a Category</h3>
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
                    {
                        this.state.selectTag?
                            <input type="submit" onClick = {this.handleSubmit.bind(this)} value = "编辑" className="animated bounceIn"/>
                            :<button onClick = {this.handleSubmit.bind(this)} className = "animated bounceIn" >添加</button>
                    }
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


module .exports = AdminTags;