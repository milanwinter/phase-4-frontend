import React ,{Component} from 'react'
import {Route} from 'react-router-dom'
import Playlist from '../components/Playlist'

class PlaylistContainer extends Component {

    componentDidMount() {
        console.log('component did mount ran')
        fetch(`http://localhost:3000/playlists`)
        .then(res => res.json())
        .then(playlists => this.setState({playlists}))
        .then(fetch('http://localhost:3000/videos')
        .then(res => res.json())
        .then(videos => this.setState({videos}))
        )

    }

    state = {
        playlists: [],
        newList: '',
        videos: []
    }

    handleChange = (e) => {
        let newList = e.target.value
        this.setState({newList})
      }

    handleSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:3000/playlists', {
            method: "POST",
            headers: {
              "Content-Type" : "application/json",
              "Accept" : "application/json"
            },
            body: JSON.stringify({
              name: `${this.state.newList}`,
              user_id: 1
            })
        }).then(res => res.json())
        .then(playlist => this.setState(prevState => ({
            playlists: [...prevState.playlists, playlist]
            })
        ))
}


    render() {
        return(
            <div>This is Our Playlist Container<br></br>
                Form for new Playlist:
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Playlist name" onChange={this.handleChange}></input>
                    <input type="submit" className="btn btn-primary"></input>
                </form>
                {this.state.playlists.length > 0 ? this.state.playlists.map(playlist => {
                    return <Playlist playlist={playlist} videos={this.state.videos}/>
                }): <p>nope</p>}

            </div>

        )
    }
}

export default PlaylistContainer