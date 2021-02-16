import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import NavigationBar from '../components/NavigationBar'
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
  }

  handleUserInfo = (info) => {
    this.setState({
      userId: info
    })
  }
  


  render() {
    return (
      
      <Router>
        <div >
          <NavigationBar signOut={this.signOut} />
          <div >
          <Route exact path='/' render={routerProps => <HomeContainer {...routerProps} handleUserInfo={this.handleUserInfo} />} />
          <Route exact path='/playlists' render={routerProps => <PlaylistContainer {...routerProps} userId={this.state.userId} auth={this.state.isAuthenticated}/> } />
          <Route exact path='/videos' render={routerProps => <VideoContainer {...routerProps} userId={this.state.userId} auth={this.state.isAuthenticated}/> } />
          <Route exact path='/profile' render={routerProps => <Profile {...routerProps} userId={this.state.userId} auth={this.state.isAuthenticated} /> } /> 
          </div>
        </div>
      </Router>
    );
  }



}

export default App;


//  style={{
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center"
// }}