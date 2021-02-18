import React ,{Component} from 'react'
import {Route} from 'react-router-dom'
import SearchResult from '../components/SearchResult'
import { withRouter } from 'react-router';
import Container from 'react-bootstrap/Container'

class VideoContainer extends Component {

    componentDidMount() {
       this.checkAuth()
    }

    checkAuth = () => {
        let token = localStorage.getItem("token")
       token ? console.log("hi") : this.props.history.push("/")
    }
    render() {
        return(
            <div>
                <Container>
                <SearchResult userId={this.props.userId}/>
                </Container>
            </div>
        )
    }
}

export default VideoContainer