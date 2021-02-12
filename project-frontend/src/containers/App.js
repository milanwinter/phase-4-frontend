import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Menu from '../components/Menu'
import PlaylistContainer from './PlaylistContainer'
import VideoContainer from './VideoContainer'
import Profile from '../components/Profile'
import SearchResult from '../components/SearchResult'
import Login from '../components/Login'
import Signup from '../components/Signup'


class App extends Component {

  state = {
    query: '',
    videos: [],
    signup: false
  }

  //event handlers
  handleSubmit = event => {
    event.preventDefault()
    console.log(`searching youtube for: ${this.state.query} `)
    fetch(`${endpoint}${key}${maxResults}${this.state.query}`)
    .then(res => res.json())
    .then(videos => this.setState({
      videos: videos.items
    }))
  }

  handleChange = (e) => {
    let query =  e.target.value
    this.setState({query})
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
    })

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
      console.log(json)
    })
  }



  render() {
    return (
      <Router>
        <div>
          <NavBar />{ this.state.signup? <Signup toggleLogin={this.toggleLogin}  handleLoginChange={this.handleLoginChange} handleSignupSubmit={this.handleSignupSubmit}/> :
          <Login handleLoginChange={this.handleLoginChange} handleLoginSubmit={this.handleLoginSubmit} toggleLogin={this.toggleLogin} /> }
          <Route exact path="/" render={()=> <div> Home Page!
            <br></br><br></br><h2>Test</h2>
            <SearchResult />
          </div>} />
          <Route path='/playlists' render={routerProps => <PlaylistContainer {...routerProps} />} />
          <Route path='/videos' render={routerProps => <VideoContainer {...routerProps} /> } />
          <Router path='/profile' render={routerProps => <Profile {...routerProps} /> } /> 
        </div>
      </Router>
    );
  }



}

export default App;
