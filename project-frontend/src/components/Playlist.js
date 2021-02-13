import React from 'react'

class Playlist extends React.Component {

   render () {
     return (
        <div className="card">
            <p>{this.props.playlist.title}</p>
        </div>
    )
   }

}
export default Playlist