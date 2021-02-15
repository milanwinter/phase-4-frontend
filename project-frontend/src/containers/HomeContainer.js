import React, {Component} from 'react'
import Button from 'react-bootstrap/Button'
import Login from '../components/Login'
import Signup from '../components/Signup'
import HomePage from '../components/HomePage'
import PlaylistContainer from './PlaylistContainer'


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
          console.log(json)
          this.setState({
              loggedIn: !this.state.loggedIn,
              user: json.user.username,
              userId: json.user.id
          })
          localStorage.setItem("token", json.jwt)
        })
    
      }
    
      loggedIn = () => {
          if (this.state.loggedIn) {
              return <PlaylistContainer userId={this.state.userId}/>
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



// if (this.state.loggedIn) {
//     return <h1> Home Page</h1>
// } else if (!this.state.loggedIn) {
//     return (
//         <Login handleLoginChange={this.handleLoginChange} handleLoginSubmit={this.handleLoginSubmit} toggleLogin={this.toggleLogin} />
//     )
    
// } else if (this.state.signup) {
//     return (
//         <Signup toggleLogin={this.toggleLogin}  handleLoginChange={this.handleLoginChange} handleSignupSubmit={this.handleSignupSubmit}/>
//     )
// }