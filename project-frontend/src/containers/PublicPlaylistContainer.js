import React ,{Component,Redirect} from 'react'
import {Route} from 'react-router-dom'
import Playlist from '../components/Playlist'
import { withRouter } from 'react-router';
import Container from 'react-bootstrap/Container'

class PublicPlaylistContainer extends Component {

    componentDidMount() {
        let token = localStorage.getItem("token")
        token ? (
        fetch(`http://localhost:3000/playlists`,{
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(playlists => this.setState({playlists}))) &&
        fetch(`http://localhost:3000/videos`,{
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json()
        .then(videos =>this.setState({videos}) )) : this.props.history.push("/") 
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


    render() {
        return(
            <div>
                <Container style={{width: 'window.InnerHeight'}} className="overflow-auto" style={{height: '900px'}}>
                <h1>All Playlists</h1><br></br>
                {this.state.playlists.length > 0 ? this.state.playlists.map(playlist => {
                    return <div style={{display: 'inline-block', width: '200px',  marginLeft: '75px', marginRight: '75px'}}><Playlist playlist={playlist} videos={this.state.videos}/></div>
                }): <p>You have no playlists.</p>}
                </Container>
            </div>

        )
    }
}

export default PublicPlaylistContainer