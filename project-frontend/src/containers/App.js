import React, {Component} from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Menu from '../components/Menu'
import PlaylistContainer from './PlaylistContainer'
import VideoContainer from './VideoContainer'
import Profile from '../components/Profile'
import SearchResult from '../components/SearchResult'
import 'bootstrap/dist/css/bootstrap.min.css';


const endpoint = `https://www.googleapis.com/youtube/v3/search?`
const key = `key=AIzaSyC4qGwOYnsvojMZx54JxEee0O7l1Is_n1g`
const maxResults = `&type=video&part=snippet&maxResults=10&q=`

class App extends Component {

  

  render() {
    return (
      <Router>
        <div>
          <NavBar />
          {/* <Login /> */}
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
