import React from 'react';
import propTypes from 'prop-types';

class Cat extends React.Component{
    render(){
        const mouse = this.props.mouse;
        return (
            <img src="./cat.png" style={{position: 'absolute', left: mouse.x, top:mouse.y}}/>
        );
    }
}

class Mouse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            x: 0,
            y: 0
        }
    }
    handleMouseMove = (e) => {
        this.setState({
            x: e.clientX,
            y: e.clientY
        })
    }
    render() {
        return (
            <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>
                <p>position is ({this.state.x}, {this.state.y})</p>
                {this.props.render(this.state)}
            </div>
        );
    }
}

class MouseTracker extends React.Component {
    static defaultProps = {
        comment: '기본 문구1'
    }
    render(){
        return(
            <>
                <h1>{this.props.comment} Move the mouse around</h1>
                <Mouse render={mouse=>(
                    <Cat mouse={mouse}/>
                )}/>
            </>
        );
    }
}

MouseTracker.propTypes = {
    comment: propTypes.string
};

// MouseTracker.defaultProps = {
//     comment: '기본 문구'
// };

export default MouseTracker;