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
import HomeContainer from './HomeContainer'
import { Redirect } from "react-router-dom";
import Logout from '../components/Logout'

class App extends Component {

  state = {
    userId: {},
    isAuthenticated: false
  }

  handleUserInfo = (info) => {
    this.setState({
      userId: info,
      isAuthenticated: true
    })
  }

  logOut = () => {
    this.setState({
      isAuthenticated: false
    })
  }

  render() {
    return (
      
      <Router>
        <div>
          <NavBar signOut={this.signOut} />

          {localStorage.getItem("token") ? <Logout logOut={this.logOut}/> : null}
          <Route exact path='/' render={routerProps => <HomeContainer {...routerProps} handleUserInfo={this.handleUserInfo} />} />
          <Route exact path='/playlists' render={routerProps => <PlaylistContainer {...routerProps} userId={this.state.userId} auth={this.state.isAuthenticated}/> } />
          <Route exact path='/videos' render={routerProps => <VideoContainer {...routerProps} userId={this.state.userId} auth={this.state.isAuthenticated}/> } />
          <Route exact path='/profile' render={routerProps => <Profile {...routerProps} userId={this.state.userId} auth={this.state.isAuthenticated} /> } /> 
        </div>
      </Router>
    );
  }



}

export default App;
