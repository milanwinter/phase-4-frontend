import React ,{Component,Redirect} from 'react'
import {Route} from 'react-router-dom'
import Playlist from '../components/Playlist'
import { withRouter } from 'react-router';
import PlaylistForm from '../components/PlaylistForm'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
class PlaylistContainer extends Component {

    componentDidMount() {
        let token = localStorage.getItem("token")
        token ? (
        fetch(`http://localhost:3000/api/v1/profile`,{
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                playlists: data.user.playlists,
                videos: data.user.videos
            })
        })
    ) : this.props.history.push("/") 
    }

    state = {
        playlists: [],
        newList: '',
        videos: []
    }

    handleChange = (e) => {
        let newList = e.target.value
        this.setState({newList})
      }

    handleSubmit = (e) => {
        e.preventDefault()
        let token = localStorage.getItem("token")
        let userId = localStorage.getItem("user")
        fetch('http://localhost:3000/playlists', {
            method: "POST",
            headers: {
              "Authorization" : `Bearer ${token}`,
              "Content-Type" : "application/json",
              "Accept" : "application/json"
            },
            body: JSON.stringify({
              name: `${this.state.newList}`,
              user_id: userId
            })
        }).then(res => res.json())
        .then(playlist => this.setState(prevState => ({
            playlists: [...prevState.playlists, playlist]
            })
        ))
}

    deletePlaylist = (playlist) => {
        this.setState(prevState => ({
            playlists: prevState.playlists.filter(list => list != playlist)
        }))
    }


    render() {
        return(
            <div>
                <Container>
                <Row>
                    <Col>
                        <PlaylistForm handleSubmit={this.handleSubmit} handleChange={this.handleChange}/>
                    </Col>
                    <Col> 
                        {this.state.playlists.length > 0 ? this.state.playlists.map(playlist => {
                            return<div style={{margin: '5px'}}> <Playlist deletePlaylist={this.deletePlaylist}usersList={true} playlist={playlist} videos={this.state.videos}/></div>
                        }): <p>You have no playlists.</p>}
                    </Col>
                   
                </Row>
                </Container>

            </div>

        )
    }
}

export default PlaylistContainer