import React ,{Component,Redirect} from 'react'
import {Route} from 'react-router-dom'
import Playlist from '../components/Playlist'
import { withRouter } from 'react-router';

class LikedPlaylistContainer extends Component {


    componentDidMount() {
        let token = localStorage.getItem("token")
        if (token) {
            this.fetchLikedPlaylists()
            this.fetchVideos()
        } else {
            this.props.history.push("/")
        }
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

    unLike = (playlistId) => {
        let newPlaylists = this.state.likedPlaylists.filter(p => p.id != playlistId)
        this.setState({
            likedPlaylists: newPlaylists
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
                {this.state.likedPlaylists.length > 0 ?
                 this.state.likedPlaylists.map(playlist => {
                     return( 
                        <div style={{display: 'inline-block', width: '25%',  marginRight: '120px', align: 'right'}}>
                            <Playlist unLike={this.unLike} fromLike={true} playlist={playlist} videos={this.state.videos}/>
                        </div>)}) : null}
            </div>
        )
    }




}

export default LikedPlaylistContainer

