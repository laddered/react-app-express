import React, {Component} from 'react';
import {Link} from "react-router-dom";

class ModalUserAuthzd extends Component {

    state = {
        user: null,
        token: false
    };

    deleteToken = ()=>{
        localStorage.removeItem('tokenReactStore');
        this.setState({
            token: localStorage.getItem('tokenReactStore') !== null
        });
        this.props.updateToken(this.state.token)
    };

    render(){
        return(
            <React.Fragment>
                <Link className="sign-in-btn" to='/userEdit'>
                    {this.props.user}
                </Link>
                <Link onClick={this.deleteToken} className="log-in-btn" to=''>
                    Log out
                </Link>
            </React.Fragment>
        );
    };
}

export {ModalUserAuthzd};