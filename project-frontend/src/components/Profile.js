import React ,{Component} from 'react'
import {Route} from 'react-router-dom'
import { withRouter } from 'react-router';

class Profile extends Component {
    
    componentDidMount() {
        this.checkAuth()
     }
 
     checkAuth = () => {
         console.log("before if else statement")
         if (!this.props.auth) {
             console.log("in profile")
             this.props.history.push("/")
         }
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