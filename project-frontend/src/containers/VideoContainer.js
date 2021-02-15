import React ,{Component} from 'react'
import {Route} from 'react-router-dom'
import SearchResult from '../components/SearchResult'

class VideoContainer extends Component {


    render() {
        return(
            <div><SearchResult userId={this.props.userId}/></div>
        )
    }
}

export default VideoContainer