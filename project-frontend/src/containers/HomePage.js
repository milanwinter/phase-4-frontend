import React, {Component} from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import PlaylistContainer from './PlaylistContainer'
import PopularPlaylists from './PopularPlaylists'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class HomePage extends Component {

    state = {
        playlists: [],
        videos: []
    }


    componentDidMount() {
        let token = localStorage.getItem("token")
        token ? (
        fetch(`http://localhost:3000/api/v1/profile`,{
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                playlists: data.user.playlists,
                videos: data.user.videos,
                user: data.user.username
            })
        })
    ) : this.props.history.push("/") 
    }


    render() {
        return(
            <div>
                <Container>
                    <h1 align= "center"> Welcome {this.state.user}! </h1> 
                    <Row>
                        <Col>
                            <h1> Your Playlists!</h1>
                            <PlaylistContainer history={this.props.history} />
                        </Col>

                        <Col>
                            <h1> Most Popular Public Playlists</h1>
                            <PopularPlaylists />
                        </Col>
                    </Row>
                </Container>
            </div>
            
        )
    }

}

export default HomePage