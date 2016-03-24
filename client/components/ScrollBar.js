import React , {Component} from 'react';

class ScrollBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            scrollTop:0
        }
    }

    render() {
        return (
            <div ref = "scrollBar" onWheel = {this.handleScroll.bind(this)} id = {this.props.id} style = {{top:this.state.scrollTop,height:'100%',position:'absolute',background:'#fafafa',height:'100%',width:100}}>
                {this.props.children}
            </div>
        );
    }

    handleScroll(e) {

        var target = this.refs.scrollBar.getDOMNode();

        const scrollBarHeight = target.offsetHeight;
        const height = target.firstChild.scrollHeight;
        var offset = height-scrollBarHeight; //内容器高度减掉外容器高度

        if(e.deltaY > 0 && this.state.scrollTop<=-offset) {
            return ;
        }

        var top = this.state.scrollTop - e.deltaY;

        if(top > 0) {
            top = 0;
        } else if(top < -height){
            top =  -height;
        }

        this.setState({
            scrollTop:top
        });
    }
}

module.exports = ScrollBar;