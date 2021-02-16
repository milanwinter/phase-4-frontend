import React ,{Component,Redirect} from 'react'
import {Route} from 'react-router-dom'
import Playlist from '../components/Playlist'
import { withRouter } from 'react-router';

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
        fetch('http://localhost:3000/playlists', {
            method: "POST",
            headers: {
              "Authorization" : `Bearer ${token}`,
              "Content-Type" : "application/json",
              "Accept" : "application/json"
            },
            body: JSON.stringify({
              name: `${this.state.newList}`,
              user_id: this.props.userId
            })
        }).then(res => res.json())
        .then(playlist => this.setState(prevState => ({
            playlists: [...prevState.playlists, playlist]
            })
        ))
}


    render() {
        return(
            <div>This is Our Playlist Container<br></br>
                Form for new Playlist:
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Playlist name" onChange={this.handleChange}></input>
                    <input type="submit" className="btn btn-primary"></input>
                </form>
                {this.state.playlists.length > 0 ? this.state.playlists.map(playlist => {
                    return <Playlist playlist={playlist} videos={this.state.videos}/>
                }): <p>nope</p>}

            </div>

        )
    }
}

export default PlaylistContainer