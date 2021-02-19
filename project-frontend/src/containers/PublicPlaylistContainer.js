import React ,{Component,Redirect} from 'react'
import {Route} from 'react-router-dom'
import Playlist from '../components/Playlist'
import { withRouter } from 'react-router';
import Container from 'react-bootstrap/Container'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'


class PublicPlaylistContainer extends Component {

    componentDidMount() {
        let token = localStorage.getItem("token")
        token ? (
        fetch(`http://localhost:3000/playlists`,{
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(playlists => this.setState({playlists}))) &&
        fetch(`http://localhost:3000/videos`,{
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json()
        .then(videos =>this.setState({videos}) )) : this.props.history.push("/") 
    }
    state = {
        playlists: [],
        videos: []
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let token = localStorage.getItem("token")
        let userId = localStorage.getItem("user")
        fetch('http://localhost:3000/playlists', {
            method: "POST",
            headers: {
              "Authorization" : `Bearer ${token}`,
              "Content-Type" : "application/json",
              "Accept" : "application/json"
            },
            body: JSON.stringify({
              name: `${this.state.newList}`,
              user_id: userId
            })
        }).then(res => res.json())
        .then(playlist => this.setState(prevState => ({
            playlists: [...prevState.playlists, playlist]
            })
        ))
    }   

    hanldeSortButton = (e) => {
        console.log(e.target.innerHTML)
        switch (e.target.innerHTML) {
            case "Title":
                let titlePlaylists = this.state.playlists.sort((a,b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1)
                console.log(titlePlaylists)
                this.setState({playlists: titlePlaylists})
                break;
            case "Most Likes":
                let likesPlaylists = this.state.playlists.sort((a,b) => a.likes.length > b.likes.length ? -1: 1)
                this.setState({playlists: likesPlaylists})
                console.log(likesPlaylists)
                break;
            case "Most Videos":
                let videosPlaylists = this.state.playlists.sort((a,b) => a.videos.length > b.videos.length ? -1 : 1)
                this.setState({playlists: videosPlaylists})
                console.log(videosPlaylists)
                break;
            default:
                break;
            
        }
    }

    render() {
        return(
            <div>
                <Container>
                    
                <h1>All Playlists</h1><br></br>

                <DropdownButton id="dropdown-basic-button" variant="info" title="Sort Playlists by">
                        <Dropdown.Item onClick={(e) => this.hanldeSortButton(e)}>Title</Dropdown.Item>
                        <Dropdown.Item onClick={(e) => this.hanldeSortButton(e)}>Most Likes</Dropdown.Item>
                        <Dropdown.Item onClick={(e) => this.hanldeSortButton(e)}>Most Videos</Dropdown.Item>
                </DropdownButton>

                {this.state.playlists.length > 0 ? this.state.playlists.map(playlist => {
                    return <Playlist playlist={playlist} videos={this.state.videos}/>
                }): <p>You have no playlists.</p>}
                </Container>
            </div>

        )
    }
}

export default PublicPlaylistContainer