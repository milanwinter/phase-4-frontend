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
import Logout from '../components/Logout'
import ProfileContainer from './ProfileContainer'
import PublicPlaylistContainer from './PublicPlaylistContainer'

class App extends Component {


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
          <Route exact path='/profile' render={routerProps => <ProfileContainer {...routerProps} /> } />
          <Route exact path='/videos' render={routerProps => <VideoContainer {...routerProps} /> } />
          <Route exact path='/playlists' render={routerProps => <PublicPlaylistContainer {...routerProps} /> } />
          {/* <Route exact path='/' render={routerProps => <Profile {...routerProps} userId={this.state.userId} auth={this.state.isAuthenticated} /> } />  */}
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