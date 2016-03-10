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
            <div ref = "scrollBar" onWheel = {this.handleScroll.bind(this)} id = {this.props.id} style = {{top:this.state.scrollTop}}>
                {this.props.children}
            </div>
        );
    }

    handleScroll(e) {
        const height = e.target.scrollHeight+200;

        if(e.deltaY > 0 && this.state.scrollTop<=-height) {
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