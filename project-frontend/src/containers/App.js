import React, {Component} from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Menu from '../components/Menu'
import PlaylistContainer from './PlaylistContainer'
import VideoContainer from './VideoContainer'
import Profile from '../components/Profile'







class App extends Component {


  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Route exact path="/" render={()=> <div> Home Page!</div>} />
          <Route path='/playlists' render={routerProps => <PlaylistContainer {...routerProps} />} />
          <Route path='/videos' render={routerProps => <VideoContainer {...routerProps} /> } />
          <Router path='/profile' render={routerProps => <Profile {...routerProps} /> } /> 

          
        </div>
      </Router>
    );
  }



}

export default App;
