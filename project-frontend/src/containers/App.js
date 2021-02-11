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

  state = {
    query: '',
    videos: []
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

  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Route exact path="/" render={()=> <div> Home Page!

            <br></br><br></br><h2>Test</h2>

            <div className="container">
              <form onSubmit={this.handleSubmit}>

              <input type="text" className="form-control" placeholder="test!" onChange={this.handleChange}></input>
                <input type="submit" className="btn btn-danger"></input>
              </form>
              <div className="row">
                <div className="col-md-12">
                  <SearchResult videos={this.state.videos}/>
                  </div>
              </div>

            </div>
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
