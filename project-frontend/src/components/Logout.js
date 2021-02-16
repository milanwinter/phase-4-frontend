import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import {Button} from 'react-bootstrap'

class Logout extends Component {

    logout = ()  => {
        localStorage.clear("token");
        window.location.href = '/';
    }

    render() {

        return <Button onClick={this.logout}>Log Out</Button>
    }
}

export default Logout;