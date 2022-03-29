import React from 'react';
import AuthContext from './AuthContext';

class VerifiedElement extends React.Component{
    static contextType = AuthContext;
    render(){
        return(<h1>Logged in {this.context}</h1>);
    }
}

export default VerifiedElement;