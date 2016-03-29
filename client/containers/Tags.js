'use strict';

import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import ScrollBar from '../components/ScrollBar';
import {fetchStaticDataIfNeed} from '../actions'

class Tags extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.initTags();
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.params.id) {
            if (nextProps.tags.length > 0) {
                nextProps.pushToFirstTags(nextProps.tags[0]._id);
            }
        }
    }

    render() {
        return (
            <div id = "categoryBox" className = "animated bounceInRight">
                <ScrollBar>
                    <ul className="cateList">
                        {this.props.tags.map((tag, key)=> {
                            return Tags.renderTagsList(tag, key)
                        })}
                    </ul>
                </ScrollBar>
                {this.props.children}
            </div>
        )
    }

    static renderTagsList(tag, key) {
        return (
            <li className = "cateCell" key = {key}>
                <Link to = {'/tags/'+tag._id} activeStyle = {{"color":"#000"}} >
                    <i className = "cateIcon iconfont" dangerouslySetInnerHTML = {{__html:(tag.icon)}}/>
                    <span className = "cateContent">{tag.name}</span>
                </Link>
            </li>
        )
    }
}

Tags.propTypes = {
    tags: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    initTags: PropTypes.func.isRequired,
    pushToFirstTags: PropTypes.func.isRequired,
    hash: PropTypes.string.isRequired
};

export default connect(state => ({
    tags: state.common.tags ? state.common.tags.dataList : [],
    isFetching: state.common.tags ? state.common.tags.isFetching : false,
    hash: state.common.tags ? state.common.tags.hash : ""
}), dispatch => ({
    initTags: ()=>dispatch(fetchStaticDataIfNeed('tags')),
    pushToFirstTags: (id)=>dispatch(push('/tags/' + id))
}))(Tags);
