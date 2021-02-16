import React ,{Component, Redirect} from 'react'
import {Route} from 'react-router-dom'
import SearchResult from '../components/SearchResult'

class VideoContainer extends Component {

    componentDidMount() {
        let token = localStorage.getItem("token")
        if (!token) {
            < Redirect to="/" />
        }
    }


    render() {
        return(
            <div><SearchResult userId={this.props.userId}/></div>
        )
    }
}

export default VideoContainer