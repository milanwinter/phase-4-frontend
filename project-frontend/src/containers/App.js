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


class App extends Component {

  state = {
    userInfo: {}
  }



  render() {
    return (
      
      <Router>
        <div>
          <NavBar />
          {/* <Route exact path="/" render={()=> <div> Home Page!
            <br></br><br></br><h2>Test</h2>
            <SearchResult />
          </div>} /> */}
          <Route exact path='/' render={routerProps => <HomeContainer {...routerProps} />} />
          {/* <Route path='/playlists' render={routerProps => <PlaylistContainer {...routerProps} />} /> */}
          <Route path='/videos' render={routerProps => <VideoContainer {...routerProps} /> } />
          <Router path='/profile' render={routerProps => <Profile {...routerProps} /> } /> 
        </div>
      </Router>
    );
  }



}

export default App;
