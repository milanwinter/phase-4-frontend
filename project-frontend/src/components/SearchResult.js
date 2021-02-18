import React from 'react'
import Video from '../components/Video'
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Key from './APIKey'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
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
        let userId = localStorage.getItem("user")
        fetch('http://localhost:3000/playlists')
        .then(resp => resp.json())
        .then(data => { 
          let playlists = data.filter(playlist => playlist.user.id == userId)
          this.setState({
            playlists: playlists
          })
        })

      }
    
      //event handlers
      handleSubmit = event => {
        event.preventDefault()
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


      experimentalChoice = (e,id,video) => {
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
                playlist_id: id
              })
          }).then(res => res.json())
          .then(console.log)
      }

    render(){
        return (
             <div>
               <Container>
                 <Row>
                   <Form onSubmit={this.handleSubmit}> 
                      <h3>Search Youtube For Videos</h3>
                      <Row>
                      <Col xs="auto">
                        <Form.Group >
                            <Form.Control type="text" placeholder="Search" onChange={this.handleChange}/>
                        </Form.Group>
                      </Col>
                        <Col xs="auto">
                          <Button variant="primary" type="submit">
                              Submit
                          </Button>
                        </Col>
                      </Row>
                    </Form>

                 </Row>
                 <Row>
                <div className="row">
                    <div className="col-md-12">
                        {this.state.videos.length > 0 ? this.state.videos.map(video => {
                            return (<div>
                              <Video video={video.id}/>
                              <DropdownButton id="dropdown-basic-button" title="Add Video to Playlist">
                                {this.state.playlists.map(playlist => {
                                  return <Dropdown.Item onClick={(e)=> this.experimentalChoice(e,playlist.id,video)} value={playlist.id} >{playlist.title}</Dropdown.Item>
                                })}
                              </DropdownButton>
                              </div>)
                        }): null}

                    </div>
                </div>
                </Row>
                </Container>
            </div>
        )
    }
}
export default SearchResult