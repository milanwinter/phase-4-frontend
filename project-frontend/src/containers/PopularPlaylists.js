import React ,{Component,Redirect} from 'react'
import {Route} from 'react-router-dom'
import Playlist from '../components/Playlist'
import { withRouter } from 'react-router';

class PopularPlaylist extends Component {

    state = {
        playlists: [],
        videos: []
    }

    componentDidMount() {
       this.fetchPopluarPlaylists()
       this.fetchVideos()
    }

    fetchPopluarPlaylists = () => {
        let token = localStorage.getItem("token")
        fetch("http://localhost:3000/playlists", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            let playlists = data.sort((a,b) =>  a.likes.length > b.likes.length ? -1: 1).slice(0,5)
            this.setState({
                playlists: playlists
            })
        })
    }

    fetchVideos = () => {
        let token = localStorage.getItem("token")
        fetch(`http://localhost:3000/videos`,{
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(videos => {
            this.setState({videos: videos})
        })
    }





    render() {
        return(
            <div>
                {this.state.playlists.map(playlist => {
                    return <Playlist playlist={playlist} videos={this.state.videos} />
                })}
            </div>

        )
    }
}

export default PopularPlaylist