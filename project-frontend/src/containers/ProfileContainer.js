import React,{Component} from 'react'
import PlaylistContainer from './PlaylistContainer'
import Container from 'react-bootstrap/Container';
import LikedPlaylistContainer from './LikedPlaylistContainer'
import { withRouter } from 'react-router';
import {Route} from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.min.css';

class ProfileContainer extends Component {

    componentDidMount() {
        let token = localStorage.getItem("token")
        token ? console.log("hi") : this.props.history.push("/")
    }


    render() {
        return (
            <div className="profile-container" >
                <Container border="black" fluid >
                    <Row style={{width: '100%'}}>
                        <Col className="overflow-auto" style={{height: '800px', align: 'right'}}>
                        <h1 align="center" >Your Created Playlists</h1>
                        <PlaylistContainer history={this.props.history}/>
                        </Col>
                        <Col className="overflow-auto" style={{height: '800px', align: 'left'}} >
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