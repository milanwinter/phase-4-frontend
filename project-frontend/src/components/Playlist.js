import React from 'react'
import Video from './Video'

class Playlist extends React.Component {

    state = {
        active: false
    }
    toggleActive= () => {
        this.setState({
            active: !this.state.active
        })
    }

   render () {
     return (
        <div className="card"  >
            <p onClick={() => {this.toggleActive()}}>{this.props.playlist.title}</p>
            {this.state.active ? <div>
            { this.props.videos.map(video => {
             return  video.playlist_id == this.props.playlist.id ? <Video video={video}/> : null
            })}
            </div>  : null}
           
        </div>
    )
   }

}
export default Playlist