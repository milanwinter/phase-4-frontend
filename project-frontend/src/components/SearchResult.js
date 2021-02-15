import React from 'react'
import Video from '../components/Video'
import 'bootstrap/dist/css/bootstrap.min.css';
import Key from './APIKey'
const endpoint = `https://www.googleapis.com/youtube/v3/search?`
const maxResults = `&type=video&part=snippet&maxResults=10&q=`

class SearchResult extends React.Component {
    //query for user input, videos for list of results from search
    state = {
        query: '',
        videos: [],
        playlists: [],
        activeList: 1
      }

      componentDidMount() {
        fetch('http://localhost:3000/playlists')
        .then(resp => resp.json())
        .then(data => { 
          console.log(data)
          let playlists = data.filter(playlist => playlist.user.id == this.props.userId)
          console.log(playlists)
          this.setState({
            playlists: playlists
          })
        })

      }
    
      //event handlers
      handleSubmit = event => {
        event.preventDefault()
        console.log(`searching youtube for: ${this.state.query} `)
        fetch(`${endpoint}${Key}${maxResults}${this.state.query}`)
        .then(res => res.json())
        .then(videos => this.setState({
          videos: videos.items
        }))
      }
      //for users searching a video
      handleChange = (e) => {
        let query =  e.target.value
        this.setState({query})
      }
      //function to add a video to a playlist
      newVideo = (video) => {
        let token = localStorage.getItem("token")
          fetch('http://localhost:3000/videos', {
              method: "POST",
              headers: {
                "Authorization" : `Bearer ${token}`,
                "Content-Type" : "application/json",
                "Accept" : "application/json"
              },
              body: JSON.stringify({
                videoId: `${video.id.videoId}`,
                playlist_id: this.state.activeList
              })
          }).then(res => res.json())
          .then(console.log)
      }
      //handle state for dropdown
      handleChoose(event) {
        console.log(event.target.value)
        this.setState({
          activeList: event.target.value});
      }

    render(){
        return (
             <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Search YouTube" className="rounded-pill" onChange={this.handleChange}></input>
                    <input type="submit" className="btn btn-danger rounded-sm"></input>
                </form>
                <div className="row">
                    <div className="col-md-12">

                      {/* select dropdown for playlists */}
                      <select value={this.state.activeList} onChange={(e) => {this.handleChoose(e)}}>
                        {this.state.playlists.length > 0 ? this.state.playlists.map(playlist => {
                          return <option value={playlist.id}>{`${playlist.title}`}</option>
                        }) : null}
                      </select>

                      {/* displays videos from the search */}
                        {this.state.videos.length > 0 ? this.state.videos.map(video => {
                            return (<div>
                              <Video video={video.id}/>
                              <button className="btn-danger"onClick={() => {this.newVideo(video)}}>Click me!</button>
                              </div>)
                        }): null}

                    </div>
                </div>
            </div>
        )
    }
}
export default SearchResult