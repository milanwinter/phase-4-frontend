import React, {Component} from 'react'
import Button from 'react-bootstrap/Button'
import Login from '../components/Login'
import Signup from '../components/Signup'
import PlaylistContainer from './PlaylistContainer'
import { Redirect } from "react-router-dom";


class HomeContainer extends Component {

    state = {
        loggedIn: false,
        signup: false,
        user: "",
        userId: 1
    }



    
    handleLoginChange = (e) => {
        this.setState({
          [e.target.name] : e.target.value
        })
      }
    
    
     handleLoginSubmit = (e) => {
        let username = this.state.username
        let password = this.state.password
        let info = {username: username, password: password}
        fetch("http://localhost:3000//api/v1/login",{
          method: "POST",
          headers: {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
          },
          body: JSON.stringify({
            user: info
          })
        })
        .then(rsp => rsp.json())
        .then(json => {
          this.setState({
              loggedIn: !this.state.loggedIn,
              user: json.user.username,
              userId: json.user.id
          })
          localStorage.setItem("token", json.jwt)
          localStorage.setItem("user",json.user.id)
          this.props.history.push("/home")
        })
    
      }
    
      loggedIn = () => {
        let token = localStorage.getItem("token")
          if (token) {
               <Redirect to="/home" />
          } else {
              if (this.state.signup) {
                  return <Signup toggleLogin={this.toggleLogin}  handleLoginChange={this.handleLoginChange} handleSignupSubmit={this.handleSignupSubmit}/>
              } else {
                  return <Login handleLoginChange={this.handleLoginChange} handleLoginSubmit={this.handleLoginSubmit} toggleLogin={this.toggleLogin} />
              }
          }
      }
    
      toggleLogin = (e) => {
        this.setState(prevState => ({
          signup: !prevState.signup
        }));
      }
    
      handleSignupSubmit = (e) => {
        let username = this.state.username
        let password = this.state.password
        let info = {username: username, password: password}
        fetch("http://localhost:3000//api/v1/users/",{
          method: "POST",
          headers: {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
          },
          body: JSON.stringify({
            user: info
          })
        })
        .then(rsp => rsp.json())
        .then(json => {
          this.setState({
            loggedIn: !this.state.loggedIn,
            user: json.user.username,
            userId: json.user.id
          })
          localStorage.setItem("token", json.jwt)
          localStorage.setItem("user",json.user.id)
          this.props.history.push("/home")
        })
      }


    render() {
        return(
            <div>
                {this.loggedIn()}
            </div>
        )
    }
}

export default HomeContainer
