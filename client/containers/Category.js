'use strict';
import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import ScrollBar from '../components/scrollBar';
import {fetchStaticDataIfNeed} from '../actions';

import './Category.less';

class Category extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.initCategory();
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.params.id) {
            if (nextProps.category.length > 0) {
                nextProps.pushToFirstCategory(nextProps.category[0]._id);
            }
        }
    }

    render() {
        return (
            <div id = "categoryBox" className = "animated bounceInRight">
                <ScrollBar>
                    <ul className="cateList">
                        {this.props.category.map((cate, key)=> {
                            return Category.renderCategoryList(cate, key)
                        })}
                    </ul>
                    <div className="clearfix"></div>
                </ScrollBar>
                {this.props.children}
            </div>
        )
    }

    static renderCategoryList(cate, key) {
        return (
            <li className = "cateCell" key = {key}>
                <Link to = {"/category/"+cate._id} activeStyle = {{"color":"#000"}} >
                    <i className = "cateIcon iconfont" dangerouslySetInnerHTML = {{__html:(cate.icon)}}/>
                    <span className = "cateContent">{cate.name}</span>
                </Link>
            </li>
        )
    }
}

Category.propTypes = {
    category: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    initCategory: PropTypes.func.isRequired,
    pushToFirstCategory: PropTypes.func.isRequired,
    hash: PropTypes.string.isRequired
};

export default connect(state => ({
    category: state.common.category ? state.common.category.dataList : [],
    isFetching: state.common.category ? state.common.category.isFetching : false,
    hash: state.common.category ? state.common.category.hash : ""
}), dispatch => ({
    initCategory: ()=>dispatch(fetchStaticDataIfNeed('category')),
    pushToFirstCategory: (id)=>dispatch(push('/category/' + id))
}))(Category);