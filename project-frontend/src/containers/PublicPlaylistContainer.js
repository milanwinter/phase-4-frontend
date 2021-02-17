import React ,{Component,Redirect} from 'react'
import {Route} from 'react-router-dom'
import Playlist from '../components/Playlist'
import { withRouter } from 'react-router';

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
            <div>This is Our Public Playlist Container<br></br>
                Add a New Playlist!:
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Playlist name" onChange={this.handleChange}></input>
                    <input type="submit" className="btn btn-primary"></input>
                </form>
                {this.state.playlists.length > 0 ? this.state.playlists.map(playlist => {
                    return <Playlist playlist={playlist} videos={this.state.videos}/>
                }): <p>You have no playlists.</p>}

            </div>

        )
    }
}

export default PublicPlaylistContainer