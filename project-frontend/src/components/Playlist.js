import React from 'react'
import Video from './Video'
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Playlist extends React.Component {

    state = {
        active: false,
        likes: 0
    }
    toggleActive= () => {
        this.setState({
            active: !this.state.active
        })
    }

    handleLike = () => {
        let token = localStorage.getItem("token")
        let userId = localStorage.getItem("user")
        fetch('http://localhost:3000/likes', {
            method: "POST",
            headers: {
              "Authorization" : `Bearer ${token}`,
              "Content-Type" : "application/json",
              "Accept" : "application/json"
            },
            body: JSON.stringify({
              playlist_id: this.props.playlist.id,
              user_id: userId
            })
        }).then(res => res.json())
        .then(console.log)
    }

   render () {
     return (
        <div className="card"  >
            <p onClick={() => {this.toggleActive()}}>{this.props.playlist.title}</p>
            <p>Likes : {this.props.playlist.likes.length}</p>
            {this.state.active ? <div>
                <button onClick={() => {this.handleLike()}}>Like!</button>
            { this.props.videos.map(video => {
             return  video.playlist_id == this.props.playlist.id ? <Video video={video}/> : null
            })}
            </div>  : null}
           
        </div>
    )
   }

}
export default Playlist