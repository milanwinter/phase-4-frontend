import React,{Component} from 'react'
import PlaylistContainer from './PlaylistContainer'
import Container from 'react-bootstrap/Container';
import LikedPlaylistContainer from './LikedPlaylistContainer'
import { withRouter } from 'react-router';
import {Route} from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class ProfileContainer extends Component {

    componentDidMount() {
        let token = localStorage.getItem("token")
        token ? console.log("hi") : this.props.history.push("/")
    }


    render() {
        return (
            <div className="profile-container" >
                <Container >
                    <Row>
                        <Col>
                        <h1> Your Playlists</h1>
                        <PlaylistContainer history={this.props.history}/>
                        </Col>
                        <Col>
                        <h1> Your Liked Playlists</h1>
                        <LikedPlaylistContainer history={this.props.history} />
                        </Col>
                    </Row>
                </Container>
            </div>

        )
    }





}

export default ProfileContainer