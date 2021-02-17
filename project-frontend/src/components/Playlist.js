import React from 'react'
import Video from './Video'
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Playlist extends React.Component {

    state = {
        active: false,
        likes: 0,
        index: 0
    }
    toggleActive= () => {
        this.setState({
            active: !this.state.active
        })
    }

    handleSelect = (e, selectedIndex) => {
        this.setState({
            index: selectedIndex
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
        this.setState({
            likes: this.state.likes + 1
        })
    }

   render () {
     return (
         <div style={{backgroundColor: 'black', width: '300px', height: '300px', borderRadius: '5px', margin: '10px' }}>
             <h4 style={{color: 'white'}}>{this.props.playlist.title}</h4>
        <Carousel activeIndex={this.state.index} onSelect={(e)=> {this.handleSelect()}} style={{color: 'blue', width: '300px'}}>
            { this.props.videos.map(video => {
              return  video.playlist_id == this.props.playlist.id ? 
              <Carousel.Item style={{width: '100%', height: '250px', align: 'center'}}>
              <Video video={video}style={{align: 'center'}}/> 
              </Carousel.Item>: null})}
        </Carousel>
        </div>
    )
   }

}
export default Playlist

        //<div className="card"  >
        //     <p onClick={() => {this.toggleActive()}}>{this.props.playlist.title}</p>
        //     <p>Likes : {this.props.playlist.likes.length}</p>
        //     {this.state.active ? <div>
        //         <button onClick={() => {this.handleLike()}}>Like!</button>
        //     { this.props.videos.map(video => {
        //      return  video.playlist_id == this.props.playlist.id ? <Video video={video}/> : null
        //     })}
        //     </div>  : null}
           
        // </div>