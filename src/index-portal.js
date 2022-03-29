import { render } from '@testing-library/react';
import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const appRoot = document.getElementById('app-root');
const modalRoot = document.getElementById('modal-root');

class Modal extends React.Component {
    constructor(props) {
        console.log(props);
        super(props);
        this.el = document.createElement('div');
    }

    componentDidMount() {
        modalRoot.appendChild(this.el);
    }

    componentWillUnmount() {
        modalRoot.removeChild(this.el);
    }

    render() {
        return ReactDOM.createPortal(
            this.props.children,
            this.el
        );
    }
}

class Parent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clicks: 0
        };
    }

    handleClick = () => {
        this.setState(state => ({
            clicks: state.clicks + 1
        }))
    }

    render() {
        return (
            <div onClick={this.handleClick}>
                <p>Number of clicks: {this.state.clicks}</p>
                <p>
                    Not a child
                </p>
                {/* <Child/> */}
                <Modal>
                    <Child />
                </Modal>
            </div>
        );
    }
}

function Child() {
    return (<div className="modal">
        <button>Click</button>
    </div>);
}

ReactDOM.render(<Parent/>, appRoot);