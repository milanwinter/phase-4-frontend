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
           let likedPlaylists = []
           data.liked_playlists.forEach(element => {
               let playlist = {title: element.playlist.title, id: element.playlist.id, likes: element.likes }
               likedPlaylists.push(playlist)
           });
           this.setState({
               likedPlaylists: likedPlaylists
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
            this.setState({
                videos: data
            })
        })
    }

    state= {
        likedPlaylists: [],
        videos: []
    }


    render() {


        return (
            <div>
                {this.state.likedPlaylists.length > 0 ? this.state.likedPlaylists.map(playlist => {return <Playlist playlist={playlist} videos={this.state.videos}/>}) : null} 
            </div>
        )
    }




}

export default LikedPlaylistContainer

