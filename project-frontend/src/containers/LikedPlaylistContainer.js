import React ,{Component,Redirect} from 'react'
import {Route} from 'react-router-dom'
import Playlist from '../components/Playlist'
import { withRouter } from 'react-router';

class LikedPlaylistContainer extends Component {


    componentDidMount() {
       this.fetchLikedPlaylists()
       this.fetchVideos()
    }

    fetchLikedPlaylists = () =>  {
        let token = localStorage.getItem("token")
        fetch(`http://localhost:3000/api/v1/profile`,{
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                likedPlaylists: data.liked_playlists
            })
        })
    }

    fetchVideos = () => {
        let token = localStorage.getItem("token")
        fetch('http://localhost:3000/videos',{
            method: "GET",
            headers: {
                Authorization:  `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log("videos")
        })
    }

    state= {
        likedPlaylists: [],
        videos: []
    }


    render() {


        return (
            <div>
                {this.state.likedPlaylists.length > 0 ? this.state.likedPlaylists.map(playlist => {return <Playlist playlist={playlist} />}) : null} 
            </div>
        )
    }




}

export default LikedPlaylistContainer

