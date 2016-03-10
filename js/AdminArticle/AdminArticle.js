'use strict';

import React, {Component} from 'react';

import {addClass,removeClass,hasClass} from '../DomOperation';

import './AdminArticle.less';

class AdminArticle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedCateValue:undefined,
            selectedCate:undefined,
            selectedTagValue:undefined,
            selectedTag:undefined,
            category:[],
            tags:[],
            writePadShow:false,
            writePadCate:undefined,
            writePadTags:[],
            writePadCateShow:false,
            writePadTagsShow:false
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

        fetch('./blogs/category.json')
        .then(res=>res.json())
        .then(json =>{
            if(json.length>0) {
                this.setState({
                    category:json
                });
            }
        });
    }

    render() {
        return (
            <div id="adminArticleBox" className = "animated bounceInRight clearfix">
                <h3>文章管理</h3>
                <div className = "clearfix">
                    <div className = "selector">
                        <button onFocus = {this.openSelectOptions} onBlur = {this.closeSelectOptions}>
                            {this.state.selectedCateValue||"Category"}
                            <span className = "selectorTriangle"/>
                        </button>
                        <ul className = "selectorOptions">
                            {this.state.category.map((row,key)=>this.renderOptions(row,key,"cate"))}
                        </ul>
                    </div>
                    <div className = "selector">
                        <button onFocus = {this.openSelectOptions} onBlur = {this.closeSelectOptions}>
                            {this.state.selectedTagValue||"Tag"}
                            <span className = "selectorTriangle"/>
                        </button>
                        <ul className = "selectorOptions">
                            {this.state.tags.map((row,key)=>this.renderOptions(row,key,"tag"))}
                        </ul>
                    </div>
                    <button className = "writeButton" onClick = {()=>this.setState({writePadShow:true})}>Write</button>
                </div>
                <div className="clearfix" style = {{marginTop:20}}>
                    <table>
                        <tr>
                            <th>日期</th>
                            <th>文章</th>
                            <th>类别</th>
                            <th>标签</th>
                            <th>操作</th>
                        </tr>
                        <tr>
                            <td>2016-1-1</td>
                            <td>这是一篇文章,有一个长长的标题,特别长的标题</td>
                            <td>学习笔记</td>
                            <td>
                                Android,
                                iOS
                            </td>
                            <td>
                                <button>编辑</button>
                                <button>删除</button>
                            </td>
                        </tr>
                    </table>
                </div>

                <div className = "writeBox" style = {{display:this.state.writePadShow?"block":"none"}}>
                    <h3>文章编辑器</h3>
                    <div className = "clearfix" style = {{marginTop:40}}>
                        <i className = "iconfont">&#xe66d;</i>
                        <input type = "text" placeholder = "Title"/>
                    </div>
                    <div className="clearfix" style = {{position: "relative"}}
                        onFocus = {()=>this.setState({writePadCateShow:true})}
                         onBlur = {()=>setTimeout(()=>this.setState({writePadCateShow:false}),200)}>
                        <i className = "iconfont">&#xe669;</i>
                        <input type = "text" placeholder = "Category" value = {this.state.writePadCate?this.state.writePadCate.name:""} readOnly/>
                        <ul className = "writeSelectorOptions" style = {{display:this.state.writePadCateShow?"block":"none"}}>
                            {this.state.category.map((row,key)=>this.renderWritePadOptions(row,key,"cate"))}
                        </ul>
                    </div>
                    <div className = "clearfix" style = {{position:"relative"}}
                         onFocus = {()=>this.setState({writePadTagsShow:true})}>
                        <i className = "iconfont">&#xe66e;</i>
                        <input type = "text" placeholder = "Tags" readonly value = {(()=>{
                            var tags = this.state.writePadTags.length>0?this.state.writePadTags[0].name:"";
                            for(var i = 1;i<this.state.writePadTags.length;i++) {
                                tags += ","+this.state.writePadTags[i].name;
                            }
                            return tags;
                        })()}/>
                        <ul className = "writeSelectorOptions" style = {{display:this.state.writePadTagsShow?"block":"none"}}>
                            <li style = {{background:"#fff"}} onClick = {()=>this.setState({writePadTagsShow:false})}>
                                <span className = "iconfont">&#xe60e;</span>
                                <span className = "content">点击此处完成选择</span>
                            </li>
                            {this.state.tags.map((row,key)=>this.renderWritePadOptions(row,key,"tags"))}
                        </ul>
                    </div>
                    <div className="clearfix"/>
                    <div className = "clearfix">
                        <i className = "iconfont" style = {{height:100,lineHeight:"100px"}}>&#xe66c;</i>
                        <textarea type = "text" placeholder = "Description"/>
                    </div>
                    <div className = "clearfix">
                        <i className = "iconfont" style = {{height:100,lineHeight:"100px"}}>&#xe66c;</i>
                        <textarea type = "text" placeholder = "Detail"/>
                    </div>
                    <button>
                        发布文章
                    </button>

                    <div className = "closeButton iconfont" onClick = {()=>this.setState({writePadShow:false})}>
                        &#xe60e;
                    </div>
                </div>
            </div>
        )
    }

    renderOptions(row,key,mothed){
        return (
            <li key = {key} onClick = {this.onSelect.bind(this,row,mothed)}>
                <i className = "iconfont" dangerouslySetInnerHTML = {{__html:(row.icon)}}/>
                <span className = "content">{row.name}</span>
            </li>
        );
    }

    renderWritePadOptions(row,key,mothed){
        return (
            <li key = {key} onClick = {this.onWritePadSelect.bind(this,row,mothed)}>
                <span className = "iconfont" dangerouslySetInnerHTML = {{__html:(row.icon)}}/>
                <span className = "content">{row.name}</span>
            </li>
        );
    }

    openSelectOptions(e){
        let optionBox = e.target.parentNode.getElementsByClassName('selectorOptions')[0];
        addClass(optionBox,'active');
    }

    closeSelectOptions(e) {
        let optionBox = e.target.parentNode.getElementsByClassName('selectorOptions')[0];
        setTimeout(()=>{
            removeClass(optionBox,'active');
        },200);

    }

    onSelect(row,mothed){
        if(mothed == 'cate') {
            this.setState({
                selectedCate:row,
                selectedCateValue:row.name
            });
        }else {
            this.setState({
                selectedTag:row,
                selectedTagValue:row.name
            });
        }
    }

    onWritePadSelect(row,mothed,e) {
        if(mothed == 'cate') {
            this.setState({
                writePadCate:row
            });
        }else {
            var tagsArr = this.state.writePadTags;
            var target = e.target;

            if(target.tagName!="LI") {
               target = target.parentNode;
            }

            if(hasClass(target,'active')) {
                removeClass(target,'active');
                for(var i = 0;i < tagsArr.length;i++) {
                    if(tagsArr[i].name == row.name) {
                        tagsArr.splice(i,1);
                        break;
                    }
                }
            }else {
                addClass(target,'active');
                tagsArr.push(row);
            }

            this.setState({
                writePadTags:tagsArr
            });
        }
    }
}


module .exports = AdminArticle;