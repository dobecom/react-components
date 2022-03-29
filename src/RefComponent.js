import React from 'react';

const node = this.myRef.current;
class RefComponent extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }
    render() {
        return <div ref={this.myRef}></div>
    }
}

export default RefComponent;