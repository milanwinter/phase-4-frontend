import React from 'react'
import Video from './Video'
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Playlist extends React.Component {

    state = {
        active: false,
        likes: 0,
        index: 0,
        liked: false,
        own: false
    }

    componentDidMount() {
        this.checkIfLiked()
    }

    checkIfLiked = () => {
        let userId = localStorage.getItem("user")
        let like = this.props.playlist.likes.filter(like => like.user_id == userId)
        let owned = this.props.playlist.user_id == userId ? true : false
        let value = like.length > 0 ? true : false
       this.setState({
           liked: value,
           like: like,
           own: owned,
           likes: this.props.playlist.likes.length
       })
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

    handleLike = (e) => {
        e.stopPropagation()
        let token = localStorage.getItem("token")
        let userId = localStorage.getItem("user")

        if (this.state.liked) {
            let likeId = this.state.like[0].id
            fetch(`http://localhost:3000/likes/${likeId}`,{
                method: "DELETE"
            })
            .then(resp => resp.json())
            .then(json => {
                console.log(json)
                this.setState({
                    liked: false,
                    likes: this.state.likes -= 1 
                })
                if (this.props.fromLike) {
                    this.props.unLike(this.props.playlist.id)
                } else {
                    console.log("nothing to do")
                }

            })
        } else if (!this.state.liked && !this.state.own) {
            fetch(`http://localhost:3000/likes`, {
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
            .then(json => {
                console.log('creating a like')
                console.log(json)
                 this.setState({
                    liked: true,
                    likes: this.state.likes +=1,
                    like: [json]
                })  
        })
        }








        
     
    }

    handleDestroy = (e, playlist) => {
        e.stopPropagation()
        let token = localStorage.getItem("token")
        let userId = localStorage.getItem("user")
        fetch (`http://localhost:3000/playlists/${playlist.id}`, {
            method: "DELETE"
        }).then(res => res.json())
        .then(json => {
            this.props.deletePlaylist(playlist)

        })

    }

    checkBeforeDelete = () => {
        let id = localStorage.getItem("user")
        let playlistId = this.props.playlist.id
        if(this.props.usersList) {
            return <button style={{float: 'right', color: 'blue'}} className="btn danger" onClick={(e) =>{this.handleDestroy(e, this.props.playlist)}}>Delete List</button>
        } else {
            return null
        }
    }

   render () {
       const changeColour = this.state.liked ? "red" : 'grey'
      return (
                <div style={{backgroundColor: 'black', width: '300px', height: '300px', borderRadius: '5px', margin: '10px' }}>
                    <h4 onClick={() => {this.toggleActive()}} style={{color: 'white'}}>{this.props.playlist.title}
                    <button style={{float: 'right', color: changeColour}} className="btn danger" onClick={(e) => {this.handleLike(e)}}> {this.state.likes}	&#9829;</button>
                    {this.checkBeforeDelete()}
                    {/* <button style={{float: 'right', color: 'blue'}} className="btn danger" onClick={(e) =>{this.handleDestroy(e, this.props.playlist)}}>x</button> */}
                    </h4> 
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