import React ,{Component} from 'react'
import {Route} from 'react-router-dom'
import { withRouter } from 'react-router';

class Profile extends Component {
    
    componentDidMount() {
        this.checkAuth()
     }
 
     checkAuth = () => {
         let token = localStorage.getItem("token")
        token ? console.log("hi") : this.props.history.push("/")
     }

    render() {
        return(
            <div>
                <h1>This is the Users Profile</h1>
            </div>
        )
    }
}

export default Profile