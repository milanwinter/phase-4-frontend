import React,{Component} from 'react'
import PlaylistContainer from './PlaylistContainer'
import Container from 'react-bootstrap/Container';
import LikedPlaylistContainer from './LikedPlaylistContainer'
import { withRouter } from 'react-router';
import {Route} from 'react-router-dom'

class ProfileContainer extends Component {

    componentDidMount() {
        let token = localStorage.getItem("token")
        token ? console.log("hi") : this.props.history.push("/")
    }


    render() {
        return (
            <div >
                <Container>
                    <h1> Hello from Profile container</h1>
                    <h1> Your Playlists</h1>
                    <PlaylistContainer history={this.props.history}/>

                    <h1> Your Liked Playlists</h1>
                    <LikedPlaylistContainer />
                    
                </Container>
            </div>

        )
    }





}

export default ProfileContainer