import React ,{Component} from 'react'
import {Route} from 'react-router-dom'
import SearchResult from '../components/SearchResult'
import { withRouter } from 'react-router';

class VideoContainer extends Component {

    componentDidMount() {
       this.checkAuth()
    }

    checkAuth = () => {
        if (!this.props.auth) {
            this.props.history.push("/")
        }
    }
    render() {
        return(
            <div><SearchResult userId={this.props.userId}/></div>
        )
    }
}

export default VideoContainer