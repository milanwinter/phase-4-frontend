import React from 'react'
import Video from './Video'

class Playlist extends React.Component {

   render () {
     return (
        <div className="card" >
            <p>{this.props.playlist.title}</p>
            { this.props.videos.map(video => {
             return  video.playlist_id == this.props.playlist.id ? <Video video={video}/> : null
            })}
        </div>
    )
   }

}
export default Playlist